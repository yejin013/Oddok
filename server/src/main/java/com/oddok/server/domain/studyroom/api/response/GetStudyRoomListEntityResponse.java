package com.oddok.server.domain.studyroom.api.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class GetStudyRoomListEntityResponse {
    private String name;
    private String image;
    private List<String> hashtags;
    private Boolean isPublic;
    private Integer currentUsers;
    private Integer limitUsers;

    @Builder
    public GetStudyRoomListEntityResponse(String name, String image, List<String> hashtags,
                                Boolean isPublic, Integer currentUsers, Integer limitUsers) {
        this.name = name;
        this.image = image;
        this.hashtags = hashtags;
        this.isPublic = isPublic;
        this.currentUsers = currentUsers;
        this.limitUsers = limitUsers;
    }
}
