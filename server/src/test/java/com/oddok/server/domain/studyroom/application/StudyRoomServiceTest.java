package com.oddok.server.domain.studyroom.application;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willReturn;

import com.oddok.server.domain.studyroom.dao.HashtagRepository;
import com.oddok.server.domain.bookmark.dao.ParticipantRepository;
import com.oddok.server.domain.studyroom.dao.StudyRoomHashtagRepository;
import com.oddok.server.domain.studyroom.dao.StudyRoomRepository;
import com.oddok.server.domain.studyroom.dto.StudyRoomDto;
import com.oddok.server.domain.studyroom.entity.Hashtag;
import com.oddok.server.domain.studyroom.entity.StudyRoom;
import com.oddok.server.domain.studyroom.mapper.StudyRoomMapper;
import com.oddok.server.domain.user.dao.UserRepository;
import com.oddok.server.domain.user.entity.User;
import java.time.LocalDateTime;
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
  private UserRepository userRepository;
  @Mock
  private StudyRoomRepository studyRoomRepository;
  @Mock
  private HashtagRepository hashtagRepository;
  @Mock
  private StudyRoomHashtagRepository studyRoomHashtagRepository;
  @Mock
  private ParticipantRepository participantRepository;

  private final StudyRoomMapper studyRoomMapper = Mappers.getMapper(StudyRoomMapper.class);


  private final Long userId = 1L;
  private final Long studyRoomId = 1L;
  private final String newHashtag = "새로운 해시태그";
  private final String oldHashtag = "기존의 해시태그";
  private final String removedHashtag = "삭제될 해시태그";

  @BeforeEach
  void setUp() {
  }


  @Test
  void 스터디룸_생성_성공() {
    //given
    StudyRoom studyRoom = createStudyRoom();
    StudyRoomDto studyRoomDto = studyRoomMapper.toDto(studyRoom);

    //when
    given(studyRoomRepository.save(any(StudyRoom.class))).willReturn(studyRoom);
    given(userRepository.findById(any())).willReturn(Optional.ofNullable(studyRoom.getUser()));
    StudyRoomDto newStudyRoomDto = studyRoomService.createStudyRoom(studyRoomDto);

    //then
    for(String name : newStudyRoomDto.getHashtags()){
      assertTrue(studyRoomDto.getHashtags().contains(name));
    }
  }

  @Test
  void 스터디룸_수정_성공_없는해시태그삭제_새로운해시태그등록() {
    //given
    StudyRoom studyRoom = createStudyRoom();

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

  Set<String> createHastagNames() {
    Set<String> hashtags = new HashSet<>();
    hashtags.add(oldHashtag);
    hashtags.add(removedHashtag);
    return hashtags;
  }

  StudyRoomDto createStudyRoomDto(Set<String> hashtags) {
    return StudyRoomDto.builder()
        .id(studyRoomId)
        .name("방 제목")
        .category("공무원 시험")
        .userId(userId)
        .sessionId("ws://session@rewrewfr")
        .image("imageUrl")
        .isPublic(false)
        .password("1234")
        .targetTime(4)
        .rule("뽀모도로로 진행합니다.")
        .isMicOn(false)
        .isCamOn(true)
        .currentUsers(0)
        .limitUsers(6)
        .startAt(LocalDateTime.now())
        .endAt(LocalDateTime.now().plusDays(5))
        .hashtags(hashtags)
        .build();
  }

  User createUser() {
    return User.builder()
        .email("parkjh4400@gmail.com")
        .build();
  }

  StudyRoom createStudyRoom(){
    StudyRoomDto studyRoomDto = createStudyRoomDto(createHastagNames());
    User user = createUser();
    StudyRoom studyRoom = studyRoomMapper.toEntity(studyRoomDto, user);
    return studyRoom;
  }

}