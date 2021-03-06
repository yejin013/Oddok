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
import java.util.HashSet;
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
    private final String sessionId = "wss://localhost:4443?sessionId=ses_IJLBwb4IbG";
    private final String token = "wss://localhost:4443?sessionId=ses_IJLBwb4IbG&token=tok_KtQQqCkgCbWtHw0e";
    private final String newHashtag = "????????? ????????????";
    private final String oldHashtag = "????????? ????????????";
    private final String removedHashtag = "????????? ????????????";

    private User user;
    private StudyRoom studyRoom;

    @BeforeEach
    void setUp() {
        user = createUser();
        studyRoom = createStudyRoom(user);
    }

    @Test
    void ????????????_??????_??????() {
        //given
        StudyRoomDto studyRoomDto = studyRoomMapper.toDto(studyRoom);

        //when
        given(studyRoomRepository.save(any(StudyRoom.class))).willReturn(studyRoom);
        //given(userRepository.findById(any())).willReturn(Optional.ofNullable(studyRoom.getUser()));
        StudyRoomDto newStudyRoomDto = studyRoomService.createStudyRoom(user, studyRoomDto);

        //then
        for (String name : newStudyRoomDto.getHashtags()) {
            assertTrue(studyRoomDto.getHashtags().contains(name));
        }
        assertTrue(studyRoom.getName().contains(studyRoomDto.getCategory().getValue()));
    }


    @Test
    void ????????????_??????_?????????_??????_????????????_??????_??????() {
        //given
        StudyRoomDto studyRoomDto = studyRoomMapper.toDto(studyRoom);

        //when
        //given(userRepository.findById(any())).willReturn(Optional.ofNullable(studyRoom.getUser()));
        given(studyRoomRepository.existsByUser(any())).willReturn(true);

        //then
        assertThrows(UserAlreadyPublishStudyRoomException.class, () -> studyRoomService.createStudyRoom(user, studyRoomDto));
    }


    @Test
    void ????????????_??????_??????_????????????????????????_???????????????????????????() {
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
    void ??????????????????_????????????_????????????_??????????????????_??????() {
        //given
        given(studyRoomRepository.findById(any())).willReturn(Optional.ofNullable(studyRoom));
        given(participantRepository.findByUser(any())).willReturn(Optional.empty());
        given(sessionManager.createSession()).willReturn(sessionId);
        given(sessionManager.getToken(sessionId)).willReturn(Optional.of(token));

        //when
        String token = studyRoomService.userJoinStudyRoom(studyRoomId, user);

        //then
        assert (studyRoom.getSessionId()).equals(sessionId);
        assert (studyRoom.getCurrentUsers()).equals(1);
    }

    @Test
    void ??????????????????_????????????_??????_???????????????_???????????????_?????????() {
        //given
        studyRoom.createSession(sessionId);
        given(studyRoomRepository.findById(studyRoomId)).willReturn(Optional.ofNullable(studyRoom));
        StudyRoom beforeStudyRoom = createStudyRoom(user);
        beforeStudyRoom.increaseCurrentUsers();
        beforeStudyRoom.increaseCurrentUsers();
        beforeStudyRoom.createSession(sessionId + "before");
        Participant participant = new Participant(beforeStudyRoom, user);
        given(participantRepository.findByUser(user)).willReturn(Optional.of(participant));
        given(studyRoomRepository.findById(participant.getId())).willReturn(Optional.ofNullable(beforeStudyRoom));
        given(sessionManager.getToken(sessionId)).willReturn(Optional.of(token));

        //when
        String getToken = studyRoomService.userJoinStudyRoom(studyRoomId, user);

        //then
        assert (beforeStudyRoom.getCurrentUsers()).equals(1);
        assert (studyRoom.getCurrentUsers()).equals(1);
        assert (getToken).equals(token);
    }

    @Test
    void ?????????????????????_?????????????????????_????????????_??????????????????() {
        //given
        studyRoom.createSession(sessionId);
        studyRoom.increaseCurrentUsers();
        given(studyRoomRepository.findById(any())).willReturn(Optional.ofNullable(studyRoom));
        given(participantRepository.findByUser(any())).willReturn(Optional.of(new Participant(studyRoom, user)));

        //when
        studyRoomService.userLeaveStudyRoom(studyRoomId, user);

        //then
        assert (studyRoom.getCurrentUsers()).equals(0);
        assertNull(studyRoom.getSessionId());
    }

    @Test
    void ?????????????????????_???????????????() {
        //given
        studyRoom.createSession(sessionId);
        studyRoom.increaseCurrentUsers();
        studyRoom.increaseCurrentUsers();
        given(studyRoomRepository.findById(any())).willReturn(Optional.ofNullable(studyRoom));
        given(participantRepository.findByUser(any())).willReturn(Optional.of(new Participant(studyRoom, user)));

        //when
        studyRoomService.userLeaveStudyRoom(studyRoomId, user);

        //then
        assert (studyRoom.getCurrentUsers()).equals(1);
        assert (studyRoom.getSessionId()).equals(sessionId);
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
                .rule("??????????????? ???????????????.")
                .isMicOn(false)
                .isCamOn(true)
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

    StudyRoom createStudyRoom(User user) {
        StudyRoomDto studyRoomDto = createStudyRoomDto(createHastagNames());
        return studyRoomMapper.toEntity(studyRoomDto, user);
    }


}