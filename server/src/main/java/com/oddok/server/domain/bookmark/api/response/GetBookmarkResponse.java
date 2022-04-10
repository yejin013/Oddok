package com.oddok.server.domain.bookmark.api.response;

import com.oddok.server.domain.bookmark.dto.ParticipantDto;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class GetBookmarkResponse {
    private Long id;

    private String name;

    private List<String> hashtags;

    private String image;

    private String rule;

    private Integer currentUsers;

    private Integer limitUsers;

    private LocalDateTime endAt;

    private List<ParticipantDto> participant;

    @Builder
    public GetBookmarkResponse(Long id, String name, List<String> hashtags, String image,
                                    String rule, Integer currentUsers, Integer limitUsers,
                                    LocalDateTime endAt, List<ParticipantDto> participant) {
        this.id = id;
        this.name = name;
        this.hashtags = hashtags;
        this.image = image;
        this.rule = rule;
        this.currentUsers = currentUsers;
        this.limitUsers = limitUsers;
        this.endAt = endAt;
        this.participant = participant;
    }
}
