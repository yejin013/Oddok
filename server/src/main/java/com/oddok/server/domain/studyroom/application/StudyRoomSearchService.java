package com.oddok.server.domain.studyroom.application;

import com.oddok.server.domain.studyroom.dao.HashtagRepository;
import com.oddok.server.domain.studyroom.dao.impl.StudyRoomQueryRepository;
import com.oddok.server.domain.studyroom.dto.StudyRoomDto;
import com.oddok.server.domain.studyroom.entity.Hashtag;
import com.oddok.server.domain.studyroom.entity.StudyRoom;
import com.oddok.server.domain.studyroom.mapper.StudyRoomMapper;

import java.util.*;

import lombok.RequiredArgsConstructor;
import org.mapstruct.factory.Mappers;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class StudyRoomSearchService {

    private final HashtagRepository hashtagRepository;
    private final StudyRoomQueryRepository studyRoomQueryRepository;

    private final StudyRoomMapper studyRoomMapper = Mappers.getMapper(StudyRoomMapper.class);

    // 해시태그 없이 스터디방 제목, 공개여부, 카테고리를 통해 스터디룸 리스트를 조회합니다. 페이징이 적용됩니다.
    public List<StudyRoomDto> getStudyRoomsBySearchConditions(String name, Boolean isPublic, String category, Pageable pageable) {
        List<StudyRoom> studyRooms = studyRoomQueryRepository.search(name, isPublic, category, pageable);
        return studyRoomMapper.toDtoList(studyRooms);
    }

    // 해시태그가 포함 된 검색의 경우, 해시태그 이름으로 해시태그를 조회한 결과를 포함하여 스터디룸을 검색합니다. 페이징이 적용됩니다.
    public List<StudyRoomDto> getStudyRoomsBySearchConditions(String name, String hashtagName, Boolean isPublic, String category, Pageable pageable) {
        List<StudyRoom> studyRooms = new ArrayList<>();
        Optional<Hashtag> hashtag = hashtagRepository.findByName(hashtagName);
        if (hashtag.isPresent()) {
            studyRooms = studyRoomQueryRepository.searchWithHashtag(name, hashtag.get(), isPublic, category, pageable);
        }
        return studyRoomMapper.toDtoList(studyRooms);
    }

}
