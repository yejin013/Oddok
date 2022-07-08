package com.oddok.server.domain.bookmark.api.response;

import com.oddok.server.domain.participant.dto.ParticipantDto;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Getter
public class GetBookmarkResponse {
    private final Long id;

    private final String name;

    private final List<String> hashtags;

    private final String image;

    private final Boolean isPublic;

    private final String rule;

    private final Integer currentUsers;

    private final Integer limitUsers;

    private final LocalDate endAt;

    private final List<ParticipantDto> participant;

    @Builder
    public GetBookmarkResponse(Long id, String name, List<String> hashtags, String image,
                               Boolean isPublic, String rule, Integer currentUsers,
                               Integer limitUsers, LocalDate endAt, List<ParticipantDto> participant) {
        this.id = id;
        this.name = name;
        this.hashtags = hashtags;
        this.image = image;
        this.isPublic = isPublic;
        this.rule = rule;
        this.currentUsers = currentUsers;
        this.limitUsers = limitUsers;
        this.endAt = endAt;
        this.participant = participant;
    }
}
