package com.oddok.server.domain.studyroom.dao.querydsl;

import java.util.List;

public interface HashtagQuerydslRepository {
  List<String> findTop15Hashtags();
}
