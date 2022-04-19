package com.oddok.server.domain.studyroom.application;

import com.oddok.server.domain.studyroom.dao.HashtagRepository;
import com.oddok.server.domain.studyroom.dao.querydsl.HashtagRepositoryCustom;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class HashtagService {

    private final HashtagRepositoryCustom hashtagRepositoryCustom;

    public List<String> findTop15Hashtags() {
        return hashtagRepositoryCustom.findTop15Hashtags();
    }

}
