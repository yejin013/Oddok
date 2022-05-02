package com.oddok.server.domain.studyroom.api.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class GetPopularHashtagsResponse {

    private final List<String> hashtags;

    @Builder
    public GetPopularHashtagsResponse(List<String> hashtags){
        this.hashtags = hashtags;
    }
}
