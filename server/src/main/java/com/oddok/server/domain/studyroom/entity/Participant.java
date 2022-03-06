package com.oddok.server.domain.studyroom.entity;

import com.oddok.server.domain.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor
public class Participant {
    @Id
    @GeneratedValue
    Long id;

    @OneToOne
    @Column(name = "study_room_id")
    private StudyRoom studyRoom;

    @OneToOne
    @Column(name = "user_id")
    private User user;

    @Column(name = "join_time")
    private LocalDateTime joinTime;
}
