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
    @JoinColumn(name = "study_room_id")
    private StudyRoom studyRoom;

    @ManyToOne
    @JoinColumn(name = "hashtag_id")
    private Hashtag hashtag;

    @Builder
    public StudyRoomHashtag(StudyRoom studyRoom, Hashtag hashtag) {
        this.studyRoom = studyRoom;
        this.hashtag = hashtag;
    }

}
