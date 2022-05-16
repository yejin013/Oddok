package com.oddok.server.domain.studyroom.application;

import com.oddok.server.domain.studyroom.dao.querydsl.HashtagQueryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class HashtagService {

    private final HashtagQueryRepository hashtagRepository;

    // 검색을 위한 해시태그 상위 15개 가져오는 메소드
    public List<String> findTop15Hashtags(String name) {
        return hashtagRepository.findTop15HashtagNamesByStudyRoomName(name);
    }

}
