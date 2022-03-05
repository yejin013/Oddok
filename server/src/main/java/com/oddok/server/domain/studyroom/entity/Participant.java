package com.oddok.server.domain.studyroom.entity;

import com.oddok.server.domain.user.entity.User;
import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Getter
@Entity
public class Participant {
    @Id
    @GeneratedValue
    Long id;

    @Column(name = "study_room_id")
    private StudyRoom studyRoom;

    @Column(name = "user_id")
    private User user;

    @Column(name = "join_time")
    private LocalDateTime joinTime;
}
