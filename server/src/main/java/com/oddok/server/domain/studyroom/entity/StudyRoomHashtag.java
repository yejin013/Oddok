package com.oddok.server.domain.studyroom.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor
public class StudyRoomHashtag {
    @Id
    @GeneratedValue
    Long id;

    @ManyToOne
    private StudyRoom studyRoom;

    @ManyToOne
    private Hashtag hashtag;

    @Builder
    public StudyRoomHashtag(StudyRoom studyRoom, Hashtag hashtag) {
        this.studyRoom = studyRoom;
        this.hashtag = hashtag;
    }
}
