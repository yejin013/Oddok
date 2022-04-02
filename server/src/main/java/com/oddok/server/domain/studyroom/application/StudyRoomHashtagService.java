package com.oddok.server.domain.studyroom.application;

import com.oddok.server.common.errors.StudyRoomNotFoundException;
import com.oddok.server.domain.studyroom.dao.HashtagRepository;
import com.oddok.server.domain.studyroom.dao.StudyRoomHashtagRepository;
import com.oddok.server.domain.studyroom.dao.StudyRoomRepository;
import com.oddok.server.domain.studyroom.entity.Hashtag;
import com.oddok.server.domain.studyroom.entity.StudyRoom;
import com.oddok.server.domain.studyroom.entity.StudyRoomHashtag;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class StudyRoomHashtagService {

    private final StudyRoomHashtagRepository studyRoomHashtagRepository;
    private final HashtagRepository hashtagRepository;
    private final StudyRoomRepository studyRoomRepository;

    public StudyRoomHashtagService(StudyRoomHashtagRepository studyRoomHashtagRepository, HashtagRepository hashtagRepository, StudyRoomRepository studyRoomRepository) {
        this.studyRoomHashtagRepository = studyRoomHashtagRepository;
        this.hashtagRepository = hashtagRepository;
        this.studyRoomRepository = studyRoomRepository;
    }

    /**
     * 스터디룸을 생성하면 해시태그와 스터디룸을 매핑하여 저장합니다.
     * 새로운 이름의 해시태그라면 생성해주어야합니다.
     */
    @Transactional
    public void createStudyRoom(Long studyRoomId, List<String> hashtags) {
        StudyRoom studyRoom = findStudyRoom(studyRoomId);
        for (String name : hashtags) {
            Hashtag hashtag = hashtagRepository.findByName(name).orElseGet(() -> createHashtag(name));
            mapStudyRoomHashtag(studyRoom, hashtag);
        }
    }

    private StudyRoom findStudyRoom(Long id) {
        return studyRoomRepository.findById(id)
                .orElseThrow(() -> new StudyRoomNotFoundException(id));
    }

    private void mapStudyRoomHashtag(StudyRoom studyRoom, Hashtag hashtag) {
        StudyRoomHashtag studyRoomHashtag = StudyRoomHashtag.builder()
                .studyRoom(studyRoom)
                .hashtag(hashtag)
                .build();
        studyRoomHashtagRepository.save(studyRoomHashtag);
    }

    private Hashtag createHashtag(String name) {
        Hashtag hashtag = Hashtag.builder().name(name).build();
        return hashtagRepository.save(hashtag);
    }

    public List<String> loadStudyRoomHashtag(Long id) {
        List<StudyRoomHashtag> studyRoomHashtags = studyRoomHashtagRepository.findAllByStudyRoom(findStudyRoom(id));
        List<String> hashtags = new ArrayList<>();
        for (StudyRoomHashtag hashtag : studyRoomHashtags) {
            hashtags.add(hashtag.getHashtag().getName());
        }
        return hashtags;
    }
}
