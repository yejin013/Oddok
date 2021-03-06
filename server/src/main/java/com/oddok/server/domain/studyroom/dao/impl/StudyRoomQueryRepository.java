package com.oddok.server.domain.studyroom.dao.impl;

import static com.oddok.server.domain.studyroom.entity.QStudyRoom.studyRoom;
import static com.oddok.server.domain.studyroom.entity.QStudyRoomHashtag.studyRoomHashtag;
import static com.querydsl.core.types.Order.*;

import com.oddok.server.domain.studyroom.entity.Category;
import com.oddok.server.domain.studyroom.entity.Hashtag;
import com.oddok.server.domain.studyroom.entity.StudyRoom;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;

import java.time.LocalDate;
import java.util.List;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Order;
import org.springframework.stereotype.Repository;

@Slf4j
@RequiredArgsConstructor
@Repository
public class StudyRoomQueryRepository {

    private final JPAQueryFactory queryFactory;

    public List<StudyRoom> search(String name, Boolean isPublic, String category,
                                                                          Pageable pageable) {
        JPAQuery<StudyRoom> query = queryFactory.selectFrom(studyRoom)
                .where(containsName(name),
                        eqIsPublic(isPublic),
                        eqCategory(category),
                        notEnd())
                .orderBy(studyRoomSort(pageable))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize());
        return query.fetch();
    }

    public List<StudyRoom> searchWithHashtag(String name, Hashtag hashtag, Boolean isPublic, String category,
                                  Pageable pageable) {
        JPAQuery<StudyRoom> query = queryFactory.selectFrom(studyRoom)
                .join(studyRoomHashtag)
                .on(studyRoom.eq(studyRoomHashtag.studyRoom))
                .where(containsName(name),
                        studyRoomHashtag.hashtag.eq(hashtag),
                        eqIsPublic(isPublic),
                        eqCategory(category),
                        notEnd())
                .orderBy(studyRoomSort(pageable))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize());
        return query.fetch();
    }

    private BooleanExpression notEnd() {
        LocalDate now = LocalDate.now();
        return studyRoom.endAt.after(now).or(studyRoom.endAt.eq(now));
    }

    private BooleanExpression eqCategory(String category) {
        if (category == null || category.isBlank()) {
            return null;
        }
        return studyRoom.category.eq(Category.valueOf(category));
    }

    private BooleanExpression eqIsPublic(Boolean isPublic) {
        if (isPublic == null || !isPublic) {
            return null;
        }
        return studyRoom.isPublic.eq(true);
    }

    private BooleanExpression containsName(String name) {
        if (name == null || name.isBlank()) {
            return null;
        }
        return studyRoom.name.contains(name);
    }

    private OrderSpecifier<?> studyRoomSort(Pageable pageable) {
        for (Order order : pageable.getSort()) {
            if (order.getProperty().equals("currentUsers")) {
                return new OrderSpecifier<>(DESC, studyRoom.currentUsers);
            }
            return new OrderSpecifier<>(DESC, studyRoom.createAt);
        }
        return new OrderSpecifier<>(DESC, studyRoom.createAt);
    }

}
