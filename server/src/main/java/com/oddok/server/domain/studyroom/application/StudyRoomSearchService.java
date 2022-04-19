package com.oddok.server.domain.studyroom.application;

import com.oddok.server.domain.studyroom.dao.StudyRoomRepository;
import com.oddok.server.domain.studyroom.dao.querydsl.StudyRoomRepositoryCustom;
import com.oddok.server.domain.studyroom.dto.StudyRoomDto;
import com.oddok.server.domain.studyroom.entity.Category;
import com.oddok.server.domain.studyroom.mapper.StudyRoomMapper;

import java.time.LocalDate;
import java.util.List;
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
  private final StudyRoomRepositoryCustom studyRoomRepositoryCustom;

  private final StudyRoomMapper studyRoomMapper = Mappers.getMapper(StudyRoomMapper.class);

  /**
   * 인자가 isPublic만 있을 때 사용하는 함수
   */
  public Page<StudyRoomDto> getStudyRooms(Pageable pageable, Boolean isPublic) {
    LocalDate now = LocalDate.now();
    if(isPublic) // 공개방만
      return studyRoomRepository.findAllByEndAtAfterAndIsPublicTrue(now, pageable).map(studyRoomMapper::toDto);
    return studyRoomRepository.findAllByEndAtAfter(now, pageable).map(studyRoomMapper::toDto);
  }

  /**
   * 이름으로 검색
   * @param isPublic
   * @param category
   * @param name
   * @param pageable
   * @return
   */
  public List<StudyRoomDto> getStudyRooms(Boolean isPublic, String category, String name, Pageable pageable) {
    return studyRoomMapper.toDtoList(studyRoomRepositoryCustom.findAllBySearchConditions(isPublic, category, name, pageable));
  }


  public Page<StudyRoomDto> getStudyRoomsByCategory(Pageable pageable, Boolean isPublic, String category) {
    LocalDate now = LocalDate.now();
    if(isPublic) // 공개방만
      return studyRoomRepository.findAllByEndAtAfterAndCategoryAndIsPublicTrue(now, Category.valueOf(category), pageable).map(studyRoomMapper::toDto);
    return studyRoomRepository.findAllByEndAtAfterAndCategory(now, Category.valueOf(category), pageable).map(studyRoomMapper::toDto);
  }

  public Page<StudyRoomDto> getStudyRoomsByName(Pageable pageable, Boolean isPublic, String name) {
    LocalDate now = LocalDate.now();
    if(isPublic) // 공개방만
      return studyRoomRepository.findAllByEndAtAfterAndNameContainingAndIsPublicTrue(now, name, pageable).map(studyRoomMapper::toDto);
    return studyRoomRepository.findAllByEndAtAfterAndNameContaining(now, name, pageable).map(studyRoomMapper::toDto);
  }
}
