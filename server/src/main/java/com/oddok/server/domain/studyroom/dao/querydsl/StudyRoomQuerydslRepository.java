package com.oddok.server.domain.studyroom.dao.querydsl;

import com.oddok.server.domain.studyroom.entity.StudyRoom;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface StudyRoomQuerydslRepository {
  List<StudyRoom> findStudyRooms(Boolean isPublic, String category, String name, Pageable pageable);
}
