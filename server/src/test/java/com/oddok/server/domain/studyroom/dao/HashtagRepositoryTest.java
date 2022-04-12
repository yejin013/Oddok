package com.oddok.server.domain.studyroom.dao;


import com.oddok.server.domain.studyroom.dto.StudyRoomDto;
import com.oddok.server.domain.studyroom.entity.Category;
import com.oddok.server.domain.studyroom.entity.Hashtag;
import com.oddok.server.domain.studyroom.entity.StudyRoom;
import com.oddok.server.domain.studyroom.entity.StudyRoomHashtag;
import com.oddok.server.domain.user.entity.User;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@ExtendWith(SpringExtension.class)
@SpringBootTest
class HashtagRepositoryTest {

    private final Long userId = 1L;
    private final Long studyRoomId = 1L;

    @Autowired
    HashtagRepository hashtagRepository;

    @Autowired
    StudyRoomHashtagRepository studyRoomHashtagRepository;

    @Test
    void findTop15Hashtags(){
        Hashtag hashtag = hashtagRepository.save(new Hashtag("교시제"));
        hashtagRepository.save(new Hashtag("목표시간"));
        hashtagRepository.save(new Hashtag("아침기상"));
        hashtagRepository.save(new Hashtag("컨셉"));
        //studyRoomHashtagRepository.save(StudyRoom.builder().name("방").build());


    }

    StudyRoomDto createStudyRoomDto(Set<String> hashtags) {
        return StudyRoomDto.builder()
                .id(studyRoomId)
                .name("방 제목")
                .category(Category.SCHOOL)
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

}