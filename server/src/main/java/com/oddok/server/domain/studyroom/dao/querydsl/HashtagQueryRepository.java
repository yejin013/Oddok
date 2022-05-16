package com.oddok.server.domain.studyroom.dao.querydsl;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HashtagQueryRepository {
  List<String> findTop15HashtagNamesByStudyRoomName(String studyRoomName);
}
