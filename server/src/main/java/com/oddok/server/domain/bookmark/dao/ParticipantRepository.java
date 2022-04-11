package com.oddok.server.domain.bookmark.dao;

import com.oddok.server.domain.studyroom.entity.Participant;
import com.oddok.server.domain.user.entity.User;

import java.util.Optional;

import com.oddok.server.domain.studyroom.entity.StudyRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParticipantRepository extends JpaRepository<Participant, Long> {

    Optional<Participant> findByUser(User user);

    List<Participant> findAllByStudyRoom(StudyRoom studyRoom);

    List<Participant> findTop5ByStudyRoomOrderByJoinTimeAsc(StudyRoom studyRoom);
}
