package com.oddok.server.domain.studyroom.api;

import com.oddok.server.domain.studyroom.application.HashtagService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/hashtag")
@RequiredArgsConstructor
public class HashtagController {

    private final HashtagService hashtagService;

    @GetMapping
    public ResponseEntity<List<String>> getPopularHashtags(){
        return ResponseEntity.ok(hashtagService.findTop15Hashtags());
    }

}
