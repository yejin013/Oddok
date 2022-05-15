package com.oddok.server.domain.studyroom.dao.impl;

import static com.oddok.server.domain.studyroom.entity.QHashtag.hashtag;
import static com.oddok.server.domain.studyroom.entity.QStudyRoomHashtag.studyRoomHashtag;

import com.oddok.server.domain.studyroom.dao.querydsl.HashtagQueryRepository;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class HashtagQueryRepositoryImpl implements HashtagQueryRepository {

  private final JPAQueryFactory queryFactory;

  public List<String> findTop15HashtagNamesByStudyRoomName(String studyRoomName){
    JPAQuery<String> query = queryFactory.select(hashtag.name)
            .from(hashtag)
            .join(studyRoomHashtag)
            .on(hashtag.eq(studyRoomHashtag.hashtag))
            .where(containsName(studyRoomName))
            .groupBy(hashtag)
            .orderBy(hashtag.count().desc())
            .limit(15);
    return query.fetch();
  };


  private BooleanExpression containsName(String studyRoomName) {
    if (studyRoomName == null || studyRoomName.isBlank()) {
      return null;
    }
    return studyRoomHashtag.studyRoom.name.contains(studyRoomName);
  }

}
