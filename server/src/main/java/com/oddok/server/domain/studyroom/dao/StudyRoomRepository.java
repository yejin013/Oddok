package com.oddok.server.domain.studyroom.dao;

import com.oddok.server.domain.studyroom.entity.Category;
import com.oddok.server.domain.studyroom.entity.StudyRoom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface StudyRoomRepository extends JpaRepository<StudyRoom, Long> {
    Page<StudyRoom> findAllByStartAtBeforeAndEndAtAfter(LocalDateTime startAt, LocalDateTime endAt, Pageable pageable);
    Page<StudyRoom> findAllByStartAtBeforeAndEndAtAfterAndCategory(LocalDateTime startAt, LocalDateTime endAt, Category category, Pageable pageable);
    Page<StudyRoom> findAllByStartAtBeforeAndEndAtAfterAndIsPublicTrue(LocalDateTime startAt, LocalDateTime endAt, Pageable pageable);
    Page<StudyRoom> findAllByStartAtBeforeAndEndAtAfterAndCategoryAndIsPublicTrue(LocalDateTime startAt, LocalDateTime endAt, Category category, Pageable pageable);
}
