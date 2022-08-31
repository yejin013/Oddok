package com.oddok.server.domain.bookmark.entity;

import com.oddok.server.domain.studyroom.entity.StudyRoom;
import com.oddok.server.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor
public class Bookmark {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "study_room_id")
    private StudyRoom studyRoom;

    @Builder
    public Bookmark(User user, StudyRoom studyRoom) {
        this.user = user;
        this.studyRoom = studyRoom;
    }

    public void changeStudyRoom(StudyRoom studyRoom) {
        this.studyRoom = studyRoom;
    }
}
