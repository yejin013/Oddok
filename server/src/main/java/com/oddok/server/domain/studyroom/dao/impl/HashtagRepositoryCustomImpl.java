package com.oddok.server.domain.studyroom.dao.impl;

import static com.oddok.server.domain.studyroom.entity.QHashtag.hashtag;
import static com.oddok.server.domain.studyroom.entity.QStudyRoomHashtag.studyRoomHashtag;

import com.oddok.server.domain.studyroom.dao.querydsl.HashtagRepositoryCustom;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class HashtagRepositoryCustomImpl implements HashtagRepositoryCustom {

  private final JPAQueryFactory queryFactory;

  public List<String> findTop15Hashtags(){
    JPAQuery<String> query = queryFactory.select(hashtag.name)
            .from(hashtag)
            .join(studyRoomHashtag)
            .on(hashtag.eq(studyRoomHashtag.hashtag))
            .groupBy(hashtag)
            .orderBy(hashtag.count().desc())
            .limit(15);
    return query.fetch();
  };

}
