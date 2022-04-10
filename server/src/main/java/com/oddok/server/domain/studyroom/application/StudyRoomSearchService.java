package com.oddok.server.domain.studyroom.application;

import com.oddok.server.domain.studyroom.dao.StudyRoomRepository;
import com.oddok.server.domain.studyroom.dto.StudyRoomDto;
import com.oddok.server.domain.studyroom.entity.Category;
import com.oddok.server.domain.studyroom.mapper.StudyRoomMapper;
import java.time.LocalDateTime;
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

  private final StudyRoomRepository studyRoomRepository;

  private final StudyRoomMapper studyRoomMapper = Mappers.getMapper(StudyRoomMapper.class);

  /**
   * 인자가 isPublic만 있을 때 사용하는 함수
   */
  public Page<StudyRoomDto> getStudyRooms(Pageable pageable, Boolean isPublic) {
    if(isPublic) // 공개방만
      return studyRoomRepository.findAllByStartAtBeforeAndEndAtAfterAndIsPublicTrue(
          LocalDateTime.now(), LocalDateTime.now(), pageable).map(studyRoomMapper::toDto);
    return studyRoomRepository.findAllByStartAtBeforeAndEndAtAfter(LocalDateTime.now(), LocalDateTime.now(), pageable).map(studyRoomMapper::toDto);
  }

  public Page<StudyRoomDto> getStudyRoomsByCategory(Pageable pageable, Boolean isPublic, String category) {
    if(isPublic) // 공개방만
      return studyRoomRepository.findAllByStartAtBeforeAndEndAtAfterAndCategoryAndIsPublicTrue(LocalDateTime.now(), LocalDateTime.now(), Category.valueOf(category), pageable).map(studyRoomMapper::toDto);
    return studyRoomRepository.findAllByStartAtBeforeAndEndAtAfterAndCategory(LocalDateTime.now(), LocalDateTime.now(), Category.valueOf(category), pageable).map(studyRoomMapper::toDto);
  }

  public Page<StudyRoomDto> getStudyRoomsByName(Pageable pageable, Boolean isPublic, String name) {
    if(isPublic) // 공개방만
      return studyRoomRepository.findAllByStartAtBeforeAndEndAtAfterAndNameContainingAndIsPublicTrue(LocalDateTime.now(), LocalDateTime.now(), name, pageable).map(studyRoomMapper::toDto);
    return studyRoomRepository.findAllByStartAtBeforeAndEndAtAfterAndNameContaining(LocalDateTime.now(), LocalDateTime.now(), name, pageable).map(studyRoomMapper::toDto);
  }
}