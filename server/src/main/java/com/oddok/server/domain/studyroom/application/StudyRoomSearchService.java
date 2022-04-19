package com.oddok.server.domain.studyroom.application;

import com.oddok.server.domain.studyroom.dao.HashtagRepository;
import com.oddok.server.domain.studyroom.dao.StudyRoomHashtagRepository;
import com.oddok.server.domain.studyroom.dao.StudyRoomRepository;
import com.oddok.server.domain.studyroom.dao.querydsl.StudyRoomRepositoryCustom;
import com.oddok.server.domain.studyroom.dto.StudyRoomDto;
import com.oddok.server.domain.studyroom.entity.Category;
import com.oddok.server.domain.studyroom.entity.Hashtag;
import com.oddok.server.domain.studyroom.entity.StudyRoom;
import com.oddok.server.domain.studyroom.entity.StudyRoomHashtag;
import com.oddok.server.domain.studyroom.mapper.StudyRoomMapper;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import lombok.RequiredArgsConstructor;
import org.mapstruct.factory.Mappers;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class StudyRoomSearchService {

    private final HashtagRepository hashtagRepository;
    private final StudyRoomRepositoryCustom studyRoomRepositoryCustom;

    private final StudyRoomMapper studyRoomMapper = Mappers.getMapper(StudyRoomMapper.class);


    /**
     * 이름으로 검색
     *
     * @param isPublic
     * @param category
     * @param name
     * @param pageable
     */
    public List<StudyRoomDto> getStudyRooms(Boolean isPublic, String category, String name, Pageable pageable) {
        return studyRoomMapper.toDtoList(studyRoomRepositoryCustom.findAllBySearchConditions(isPublic, category, name, pageable));
    }

    public List<StudyRoomDto> getStudyRoomsByHashtag(Boolean isPublic, String category, String hashtagName, Pageable pageable) {
        return hashtagRepository.findByName(hashtagName)
                .map(hashtag -> studyRoomMapper.toDtoList(studyRoomRepositoryCustom.findAllByHashtag(isPublic, category, hashtag, pageable)))
                .orElse(null);
    }

}
