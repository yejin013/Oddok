package com.oddok.server.domain.studyroom.dao.querydsl;

import java.util.List;

public interface HashtagRepositoryCustom {
  List<String> findTop15Hashtags();
}
