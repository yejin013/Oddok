package com.oddok.server.domain.studyroom.dao;

import com.oddok.server.domain.studyroom.entity.StudyRoom;
import com.oddok.server.domain.studyroom.entity.StudyRoomHashtag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudyRoomHashtagRepository extends JpaRepository<StudyRoomHashtag, Long> {
    List<StudyRoomHashtag> findAllByStudyRoom(StudyRoom studyRoom);
}
