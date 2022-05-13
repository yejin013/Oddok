package com.oddok.server.domain.studyroom.dao;

import com.oddok.server.domain.studyroom.entity.StudyRoom;
import com.oddok.server.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudyRoomRepository extends JpaRepository<StudyRoom, Long> {
    Optional<StudyRoom> findByUser(User user);
    boolean existsByUser(User user);
}
