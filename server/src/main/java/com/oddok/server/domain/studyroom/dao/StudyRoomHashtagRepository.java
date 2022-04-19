package com.oddok.server.domain.studyroom.dao;

import com.oddok.server.domain.studyroom.entity.Hashtag;
import com.oddok.server.domain.studyroom.entity.StudyRoom;
import com.oddok.server.domain.studyroom.entity.StudyRoomHashtag;
import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudyRoomHashtagRepository extends JpaRepository<StudyRoomHashtag, Long> {
    Set<StudyRoomHashtag> findAllByStudyRoom(StudyRoom studyRoom);
    List<StudyRoomHashtag> findAllByHashtag(Hashtag hashtag);
}
