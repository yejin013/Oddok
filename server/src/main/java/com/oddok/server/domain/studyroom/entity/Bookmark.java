package com.oddok.server.domain.studyroom.entity;

import com.oddok.server.domain.user.entity.User;
import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
public class Bookmark {
    @Id
    @GeneratedValue
    Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToOne
    @JoinColumn(name = "study_room_id")
    private StudyRoom studyRoom;
}
