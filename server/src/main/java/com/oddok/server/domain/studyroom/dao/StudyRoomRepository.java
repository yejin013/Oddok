package com.oddok.server.domain.studyroom.dao;

import com.oddok.server.domain.studyroom.entity.Category;
import com.oddok.server.domain.studyroom.entity.StudyRoom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface StudyRoomRepository extends JpaRepository<StudyRoom, Long> {
    Optional<StudyRoom> findByIdAndEndAtAfter(Long id, LocalDate endAt);
    Page<StudyRoom> findAllByEndAtAfter(LocalDate endAt, Pageable pageable);
    Page<StudyRoom> findAllByEndAtAfterAndCategory(LocalDate endAt, Category category, Pageable pageable);
    Page<StudyRoom> findAllByEndAtAfterAndIsPublicTrue(LocalDate endAt, Pageable pageable);
    Page<StudyRoom> findAllByEndAtAfterAndCategoryAndIsPublicTrue(LocalDate endAt, Category category, Pageable pageable);
    Page<StudyRoom> findAllByEndAtAfterAndNameContaining(LocalDate endAt, String name, Pageable pageable);
    Page<StudyRoom> findAllByEndAtAfterAndNameContainingAndIsPublicTrue(LocalDate endAt, String name, Pageable pageable);
}
