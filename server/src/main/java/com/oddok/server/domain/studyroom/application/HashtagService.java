package com.oddok.server.domain.studyroom.application;

import com.oddok.server.domain.studyroom.dao.querydsl.HashtagQuerydslRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class HashtagService {

    private final HashtagQuerydslRepository hashtagRepositoryCustom;

    public List<String> findTop15Hashtags() {
        return hashtagRepositoryCustom.findTop15Hashtags();
    }

}
