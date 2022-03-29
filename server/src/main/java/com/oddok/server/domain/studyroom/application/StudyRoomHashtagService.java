package com.oddok.server.domain.studyroom.application;

import com.oddok.server.common.errors.StudyRoomNotFoundException;
import com.oddok.server.domain.studyroom.dao.HashtagRepository;
import com.oddok.server.domain.studyroom.dao.StudyRoomHashtagRepository;
import com.oddok.server.domain.studyroom.dao.StudyRoomRepository;
import com.oddok.server.domain.studyroom.entity.Hashtag;
import com.oddok.server.domain.studyroom.entity.StudyRoom;
import com.oddok.server.domain.studyroom.entity.StudyRoomHashtag;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
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
    public void createStudyRoom(Long studyRoomId, List<String> hashtags) {
        StudyRoom studyRoom = getStudyRoom(studyRoomId);
        createStudyRoomHashtags(studyRoom, hashtags);
    }

    /**
     * 스터디룸의 해시태그를 변경합니다. 기존 해시태그를 삭제하고 새로 등록합니다.
     * @param studyRoomId
     * @param hashtags
     */
    public void updateStudyRoom(Long studyRoomId, List<String> hashtags){
        StudyRoom studyRoom = getStudyRoom(studyRoomId);
        studyRoomHashtagRepository.deleteAllByStudyRoom(studyRoom); // 기존 삭제
        createStudyRoomHashtags(studyRoom, hashtags);
    }

    private void createStudyRoomHashtags(StudyRoom studyRoom, List<String> hashtags){
        hashtags.forEach(name -> {
            Hashtag hashtag = hashtagRepository.findByName(name).orElseGet(() -> createHashtag(name));
            mapStudyRoomHashtag(studyRoom, hashtag);
        });
    }

    private StudyRoom getStudyRoom(Long id) {
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
}
