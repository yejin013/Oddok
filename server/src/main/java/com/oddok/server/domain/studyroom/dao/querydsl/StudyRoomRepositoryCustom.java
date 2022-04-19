package com.oddok.server.domain.studyroom.dao.querydsl;

import com.oddok.server.domain.studyroom.entity.Category;
import com.oddok.server.domain.studyroom.entity.StudyRoom;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

public interface StudyRoomRepositoryCustom {
  List<StudyRoom> findAllBySearchConditions(Boolean isPublic, String category, String name, Pageable pageable);
}
