package com.oddok.server.domain.bookmark.dao;

import com.oddok.server.domain.studyroom.entity.Participant;
import com.oddok.server.domain.studyroom.entity.StudyRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParticipantRepository extends JpaRepository<Participant, Long> {
    List<Participant> findAllByStudyRoom(StudyRoom studyRoom);
}
