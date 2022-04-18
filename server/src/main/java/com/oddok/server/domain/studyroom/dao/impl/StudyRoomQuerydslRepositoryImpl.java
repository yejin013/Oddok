package com.oddok.server.domain.studyroom.dao.impl;

import static com.oddok.server.domain.studyroom.entity.QStudyRoom.studyRoom;
import static com.querydsl.core.types.Order.*;

import com.oddok.server.domain.studyroom.entity.Category;
import com.oddok.server.domain.studyroom.entity.StudyRoom;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Order;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class StudyRoomQuerydslRepositoryImpl {

  private final JPAQueryFactory queryFactory;

  public List<StudyRoom> findStudyRooms(Boolean isPublic, String category, String name,
      Pageable pageable) {
    LocalDate now = LocalDate.now();
    JPAQuery<StudyRoom> query = queryFactory.selectFrom(studyRoom)
        .where(studyRoom.endAt.after(now).and(
            studyRoom.isPublic.eq(isPublic).and(
                studyRoom.category.eq(Category.valueOf(category)).and(
                    studyRoom.name.contains(name)
                )
            ))).orderBy(studyRoomSort(pageable)).offset(pageable.getOffset()).limit(pageable.getPageSize());
    return query.fetch();
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
