package com.oddok.server.domain.studyroom.api;

import com.oddok.server.domain.studyroom.api.response.GetPopularHashtagsResponse;
import com.oddok.server.domain.studyroom.application.HashtagService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/hashtag")
@RequiredArgsConstructor
public class HashtagController {

    private final HashtagService hashtagService;

    /**
     * 스터디룸에서 가장 많이 쓰인 해시태그를 조회합니다.
     * @param name 스터디룸 방 이름으로 검색 시 해당 검색 결과 내에서 가장 많이 쓰인 해시태그를 조회합니다.
     * @return 해시태그 이름 리스트
     */
    @GetMapping("/popular")
    public ResponseEntity<GetPopularHashtagsResponse> getPopularHashtags(@RequestParam(required = false) String name){
        GetPopularHashtagsResponse response = new GetPopularHashtagsResponse(hashtagService.findTop15Hashtags(name));
        return ResponseEntity.ok(response);
    }

}
