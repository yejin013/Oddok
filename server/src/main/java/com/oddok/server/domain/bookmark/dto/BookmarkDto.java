package com.oddok.server.domain.bookmark.dto;

import com.oddok.server.domain.participant.dto.ParticipantDto;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Getter
public class BookmarkDto {
    private final Long id;

    private final String name;

    private final Set<String> hashtags;

    private final String image;

    private final Boolean isPublic;

    private final String rule;

    private final Integer currentUsers;

    private final Integer limitUsers;

    private final LocalDateTime endAt;

    private final List<ParticipantDto> participant;

    @Builder
    public BookmarkDto(Long id, String name, Set<String> hashtags, String image,
                       Boolean isPublic, String rule, Integer currentUsers,
                       Integer limitUsers, LocalDateTime endAt, List<ParticipantDto> participant) {
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
