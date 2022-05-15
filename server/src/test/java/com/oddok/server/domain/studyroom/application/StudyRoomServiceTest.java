package com.oddok.server.domain.studyroom.application;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

import com.oddok.server.common.errors.UserAlreadyJoinedStudyRoom;
import com.oddok.server.common.errors.UserAlreadyPublishStudyRoomException;
import com.oddok.server.domain.participant.dao.ParticipantRepository;
import com.oddok.server.domain.participant.entity.Participant;
import com.oddok.server.domain.studyroom.dao.HashtagRepository;
import com.oddok.server.domain.studyroom.dao.StudyRoomRepository;
import com.oddok.server.domain.studyroom.dto.StudyRoomDto;
import com.oddok.server.domain.studyroom.entity.Category;
import com.oddok.server.domain.studyroom.entity.Hashtag;
import com.oddok.server.domain.studyroom.entity.StudyRoom;
import com.oddok.server.domain.studyroom.mapper.StudyRoomMapper;
import com.oddok.server.domain.user.dao.UserRepository;
import com.oddok.server.domain.user.entity.User;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mapstruct.factory.Mappers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class StudyRoomServiceTest {

    @InjectMocks
    private StudyRoomService studyRoomService;

    @Mock
    private SessionManager sessionManager;

    @Mock
    private UserRepository userRepository;
    @Mock
    private StudyRoomRepository studyRoomRepository;
    @Mock
    private HashtagRepository hashtagRepository;
    @Mock
    private ParticipantRepository participantRepository;

    private final StudyRoomMapper studyRoomMapper = Mappers.getMapper(StudyRoomMapper.class);

    private final Long userId = 1L;
    private final Long studyRoomId = 1L;
    private final String sessionId = "wss://localhost:4443?sessionId=ses_IJLBwb4IbG&token=tok_KtQQqCkgCbWtHw0e";
    private final String newHashtag = "새로운 해시태그";
    private final String oldHashtag = "기존의 해시태그";
    private final String removedHashtag = "삭제될 해시태그";

    private User user;
    private StudyRoom studyRoom;

    @BeforeEach
    void setUp(){
        user = createUser();
        studyRoom = createStudyRoom();
    }

    @Test
    void 스터디룸_생성_성공() {
        //given
        StudyRoomDto studyRoomDto = studyRoomMapper.toDto(studyRoom);

        //when
        given(studyRoomRepository.save(any(StudyRoom.class))).willReturn(studyRoom);
        given(userRepository.findById(any())).willReturn(Optional.ofNullable(studyRoom.getUser()));
        StudyRoomDto newStudyRoomDto = studyRoomService.createStudyRoom(studyRoomDto);

        //then
        for (String name : newStudyRoomDto.getHashtags()) {
            assertTrue(studyRoomDto.getHashtags().contains(name));
        }
        assertTrue(studyRoom.getName().contains(studyRoomDto.getCategory().getValue()));
    }


    @Test
    void 사용자가_이미_개설한_방이_있을경우_생성_실패() {
        //given
        StudyRoomDto studyRoomDto = studyRoomMapper.toDto(studyRoom);

        //when
        given(userRepository.findById(any())).willReturn(Optional.ofNullable(studyRoom.getUser()));
        given(studyRoomRepository.existsByUser(any())).willReturn(true);

        //then
        assertThrows(UserAlreadyPublishStudyRoomException.class, () -> studyRoomService.createStudyRoom(studyRoomDto));
    }


    @Test
    void 스터디룸_수정_성공_없는해시태그삭제_새로운해시태그등록() {
        //given
        Set<String> newHastags = new HashSet<>();
        newHastags.add(newHashtag);
        newHastags.add(oldHashtag);

        given(hashtagRepository.findByName(oldHashtag)).willReturn(
                Optional.of(new Hashtag(oldHashtag)));
        given(hashtagRepository.findByName(newHashtag)).willReturn(
                Optional.of(new Hashtag(newHashtag)));
        given(studyRoomRepository.findById(studyRoomId)).willReturn(Optional.of(studyRoom));

        //when
        StudyRoomDto updateDto = createStudyRoomDto(newHastags);
        StudyRoomDto updatedStudyRoomDto = studyRoomService.updateStudyRoom(updateDto);

        //then
        assertTrue(updatedStudyRoomDto.getHashtags().contains(newHashtag));
        assertTrue(updatedStudyRoomDto.getHashtags().contains(oldHashtag));
        assertFalse(updatedStudyRoomDto.getHashtags().contains(removedHashtag));
        assertEquals(updatedStudyRoomDto.getHashtags().size(), 2);
    }


    @Test
    void 스터디룸참여_처음일때_세션생성_참여인원증가_성공() {
        //given
        given(userRepository.findById(any())).willReturn(Optional.ofNullable(user));
        given(studyRoomRepository.findById(any())).willReturn(Optional.ofNullable(studyRoom));
        given(participantRepository.findByUser(any())).willReturn(Optional.empty());
        given(sessionManager.createSession()).willReturn(sessionId);

        //when
        studyRoomService.userJoinStudyRoom(userId, studyRoomId);

        //then
        assert(studyRoom.getSessionId()).equals(sessionId);
        assert(studyRoom.getCurrentUsers()).equals(1);
    }

    @Test
    void 스터디룸참여_사용자가_이미_스터디룸에_참여중이면_예외처리() {
        //given
        given(userRepository.findById(any())).willReturn(Optional.ofNullable(user));
        given(studyRoomRepository.findById(any())).willReturn(Optional.ofNullable(studyRoom));
        given(participantRepository.findByUser(any())).willReturn(Optional.of(new Participant(studyRoom, user)));

        //when,then
        assertThrows(UserAlreadyJoinedStudyRoom.class, () -> studyRoomService.userJoinStudyRoom(userId, studyRoomId));
    }

    @Test
    void 스터디룸나가기_마지막사용자면_세션삭제_참여자수감소() {
        //given
        studyRoom.createSession(sessionId);
        studyRoom.increaseCurrentUsers();
        given(userRepository.findById(any())).willReturn(Optional.ofNullable(user));
        given(studyRoomRepository.findById(any())).willReturn(Optional.ofNullable(studyRoom));
        given(participantRepository.findByUser(any())).willReturn(Optional.of(new Participant(studyRoom, user)));

        //when
        studyRoomService.userLeaveStudyRoom(userId, studyRoomId);

        //then
        assert(studyRoom.getCurrentUsers()).equals(0);
        assertNull(studyRoom.getSessionId());
    }

    @Test
    void 스터디룸나가기_참여자감소() {
        //given
        studyRoom.createSession(sessionId);
        studyRoom.increaseCurrentUsers();
        studyRoom.increaseCurrentUsers();
        given(userRepository.findById(any())).willReturn(Optional.ofNullable(user));
        given(studyRoomRepository.findById(any())).willReturn(Optional.ofNullable(studyRoom));
        given(participantRepository.findByUser(any())).willReturn(Optional.of(new Participant(studyRoom, user)));

        //when
        studyRoomService.userLeaveStudyRoom(userId, studyRoomId);

        //then
        assert(studyRoom.getCurrentUsers()).equals(1);
        assert(studyRoom.getSessionId()).equals(sessionId);
    }

    Set<String> createHastagNames() {
        Set<String> hashtags = new HashSet<>();
        hashtags.add(oldHashtag);
        hashtags.add(removedHashtag);
        return hashtags;
    }

    StudyRoomDto createStudyRoomDto(Set<String> hashtags) {
        return StudyRoomDto.builder()
                .id(studyRoomId)
                .name(null)
                .category(Category.SCHOOL)
                .userId(userId)
                .image("imageUrl")
                .isPublic(false)
                .password("1234")
                .targetTime(4)
                .rule("뽀모도로로 진행합니다.")
                .isMicOn(false)
                .isCamOn(true)
                .currentUsers(0)
                .limitUsers(6)
                .endAt(LocalDate.now().plusDays(5))
                .hashtags(hashtags)
                .build();
    }


    User createUser() {
        return User.builder()
                .email("parkjh4400@gmail.com")
                .build();
    }

    StudyRoom createStudyRoom() {
        StudyRoomDto studyRoomDto = createStudyRoomDto(createHastagNames());
        User user = createUser();
        return studyRoomMapper.toEntity(studyRoomDto, user);
    }


}