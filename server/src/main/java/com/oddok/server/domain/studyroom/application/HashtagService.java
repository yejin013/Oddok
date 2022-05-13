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

    private final HashtagQueryRepository hashtagQueryRepository;

    public List<String> findTop15Hashtags(String name) {
        return hashtagQueryRepository.findTop15Hashtags(name);
    }

}
