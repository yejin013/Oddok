package com.oddok.server.domain.studyroom.dao;

import com.oddok.server.domain.studyroom.entity.Category;
import com.oddok.server.domain.studyroom.entity.StudyRoom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface StudyRoomRepository extends JpaRepository<StudyRoom, Long> {
    Optional<StudyRoom> findByIdAndCreateAtBeforeAndEndAtAfter(Long id, LocalDateTime createAt, LocalDate endAt);
    Page<StudyRoom> findAllByCreateAtBeforeAndEndAtAfter(LocalDateTime createAt, LocalDate endAt, Pageable pageable);
    Page<StudyRoom> findAllByCreateAtBeforeAndEndAtAfterAndCategory(LocalDateTime createAt, LocalDate endAt, Category category, Pageable pageable);
    Page<StudyRoom> findAllByCreateAtBeforeAndEndAtAfterAndIsPublicTrue(LocalDateTime createAt, LocalDate endAt, Pageable pageable);
    Page<StudyRoom> findAllByCreateAtBeforeAndEndAtAfterAndCategoryAndIsPublicTrue(LocalDateTime createAt, LocalDate endAt, Category category, Pageable pageable);
    Page<StudyRoom> findAllByCreateAtBeforeAndEndAtAfterAndNameContaining(LocalDateTime createAt, LocalDate endAt, String name, Pageable pageable);
    Page<StudyRoom> findAllByCreateAtBeforeAndEndAtAfterAndNameContainingAndIsPublicTrue(LocalDateTime createAt, LocalDate endAt, String name, Pageable pageable);
}
