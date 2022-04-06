package com.oddok.server.domain.studyroom.application;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.will;
import static org.mockito.BDDMockito.willReturn;
import static org.mockito.Mockito.when;

import com.oddok.server.domain.studyroom.dao.HashtagRepository;
import com.oddok.server.domain.studyroom.dao.ParticipantRepository;
import com.oddok.server.domain.studyroom.dao.StudyRoomHashtagRepository;
import com.oddok.server.domain.studyroom.dao.StudyRoomRepository;
import com.oddok.server.domain.studyroom.dto.StudyRoomDto;
import com.oddok.server.domain.studyroom.entity.Hashtag;
import com.oddok.server.domain.studyroom.entity.StudyRoom;
import com.oddok.server.domain.studyroom.entity.StudyRoomHashtag;
import com.oddok.server.domain.studyroom.mapper.StudyRoomMapper;
import com.oddok.server.domain.user.dao.UserRepository;
import com.oddok.server.domain.user.entity.User;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
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

  @BeforeEach
  void setUp() {
  }


  @Test
  void 해시태그_수정시_없는해시태그삭제_새로운해시태그등록() {
    //given
    String newHashtag = "새로운 해시태그";
    String oldHashtag = "기존의 해시태그";
    String removedHastag = "삭제될 해시태그";

    StudyRoom studyRoom = studyRoomMapper.toEntity(createStudyRoomDto(), createUser());
    studyRoom.addHashtag(new Hashtag(removedHastag));
    studyRoom.addHashtag(new Hashtag(oldHashtag));

    Set<String> newHastags = new HashSet<>();
    newHastags.add(newHashtag);
    newHastags.add(oldHashtag);

    given(hashtagRepository.findByName(newHashtag)).willReturn(
        Optional.of(new Hashtag(newHashtag)));

    //when
    studyRoomService.mapStudyRoomAndHashtags(studyRoom, newHastags);

    //then
    Set<String> findNames = new HashSet<>();
    for (StudyRoomHashtag studyRoomHashtag : studyRoom.getHashtags()) {
      findNames.add(studyRoomHashtag.getHashtag().getName());
    }
    assertTrue(findNames.contains(newHashtag));
    assertTrue(findNames.contains(oldHashtag));
    assertFalse(findNames.contains(removedHastag));
    assertEquals(studyRoom.getHashtags().size(), 2);
  }

  Set<String> createHastagNames() {
    Set<String> hashtags = new HashSet<>();
    hashtags.add("주말");
    hashtags.add("교시제");
    return hashtags;
  }

  StudyRoomDto createStudyRoomDto() {
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
        .hashtags(Set.of("교시제", "주말"))
        .build();
  }

  User createUser() {
    return User.builder()
        .email("parkjh4400@gmail.com")
        .build();
  }

}