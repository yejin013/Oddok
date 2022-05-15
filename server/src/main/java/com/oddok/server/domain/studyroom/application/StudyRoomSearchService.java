package com.oddok.server.domain.studyroom.application;

import com.oddok.server.domain.studyroom.dao.HashtagRepository;
import com.oddok.server.domain.studyroom.dao.StudyRoomRepository;
import com.oddok.server.domain.studyroom.dto.StudyRoomDto;
import com.oddok.server.domain.studyroom.mapper.StudyRoomMapper;

import java.util.List;

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
    private final StudyRoomRepository studyRoomRepository;

    private final StudyRoomMapper studyRoomMapper = Mappers.getMapper(StudyRoomMapper.class);

    // 방제목으로 스터디룸 리스트 조회
    public List<StudyRoomDto> getStudyRooms(Boolean isPublic, String category, String name, Pageable pageable) {
        return studyRoomMapper.toDtoList(studyRoomRepository.findAllByIsPublicAndCategoryAndName(isPublic, category, name, pageable));
    }

    // 해시태그로 스터디룸 리스트 조회
    public List<StudyRoomDto> getStudyRoomsByHashtag(Boolean isPublic, String category, String hashtagName, Pageable pageable) {
        return hashtagRepository.findByName(hashtagName)
                .map(hashtag -> studyRoomMapper.toDtoList(studyRoomRepository.findAllByIsPublicAndCategoryAndHashtags(isPublic, category, hashtag, pageable)))
                .orElse(null);
    }

}
