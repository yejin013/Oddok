package com.oddok.server.domain.studyroom.dao.querydsl;

import com.oddok.server.domain.studyroom.entity.Hashtag;
import com.oddok.server.domain.studyroom.entity.StudyRoom;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;

public interface StudyRoomQueryRepository {
  List<StudyRoom> findAllByIsPublicAndCategoryAndName(Boolean isPublic, String category, String name, Pageable pageable);
  List<StudyRoom> findAllByIsPublicAndCategoryAndHashtags(Boolean isPublic, String category, Hashtag hashtag, Pageable pageable);
}
