package com.oddok.server.domain.studyroom.dao.impl;

import static com.oddok.server.domain.studyroom.entity.QStudyRoom.studyRoom;
import static com.oddok.server.domain.studyroom.entity.QStudyRoomHashtag.studyRoomHashtag;
import static com.querydsl.core.types.Order.*;

import com.oddok.server.domain.studyroom.dao.querydsl.StudyRoomQueryRepository;
import com.oddok.server.domain.studyroom.entity.Category;
import com.oddok.server.domain.studyroom.entity.Hashtag;
import com.oddok.server.domain.studyroom.entity.StudyRoom;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import lombok.RequiredArgsConstructor;
import org.apache.tomcat.jni.Local;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Order;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class StudyRoomQueryRepositoryImpl implements StudyRoomQueryRepository {

    private final JPAQueryFactory queryFactory;

    public List<StudyRoom> findAllBySearchConditions(Boolean isPublic, String category, String name,
                                                     Pageable pageable) {
        LocalDate now = LocalDate.now();
        JPAQuery<StudyRoom> query = queryFactory.selectFrom(studyRoom)
                .where(studyRoom.endAt.isNull().or(studyRoom.endAt.after(now)),
                        eqIsPublic(isPublic),
                        eqCategory(category),
                        containsName(name))
                .orderBy(studyRoomSort(pageable))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize());
        return query.fetch();
    }

    public List<StudyRoom> findAllByHashtag(Boolean isPublic, String category, Hashtag hashtag,
                                                     Pageable pageable) {
        LocalDate now = LocalDate.now();
        JPAQuery<StudyRoom> query = queryFactory.selectFrom(studyRoom)
                .innerJoin(studyRoomHashtag)
                .on(studyRoom.eq(studyRoomHashtag.studyRoom))
                .where(studyRoom.endAt.isNull().or(studyRoom.endAt.after(now)),
                        eqIsPublic(isPublic),
                        eqCategory(category),
                        studyRoomHashtag.hashtag.eq(hashtag))
                .orderBy(studyRoomSort(pageable))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize());
        return query.fetch();
    }

    public Optional<StudyRoom> findByIdAndEndAtIsNullOrAfter(Long id) {

        LocalDate now = LocalDate.now();
        JPAQuery<StudyRoom> query = queryFactory.selectFrom(studyRoom)
                .where(studyRoom.endAt.isNull().or(studyRoom.endAt.after(now)),
                        studyRoom.id.eq(id));
        return Optional.ofNullable(query.fetchOne());
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

}