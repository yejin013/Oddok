package com.oddok.server.domain.bookmark.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Getter
public class BookmarkDto {
    private String name;

    private Set<String> hashtags;

    private String image;

    private String rule;

    private Integer currentUsers;

    private Integer limitUsers;

    private LocalDateTime endAt;

    private List<ParticipantDto> participant;

    @Builder
    public BookmarkDto(String name, Set<String> hashtags, String image,
                               String rule, Integer currentUsers, Integer limitUsers,
                               LocalDateTime endAt, List<ParticipantDto> participant) {
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
