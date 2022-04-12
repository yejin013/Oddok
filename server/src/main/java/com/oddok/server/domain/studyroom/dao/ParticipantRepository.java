package com.oddok.server.domain.studyroom.dao;

import com.oddok.server.domain.studyroom.entity.Participant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParticipantRepository extends JpaRepository<Participant, Long> {
}
