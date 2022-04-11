package com.oddok.server.domain.participant.entity;

import com.oddok.server.domain.studyroom.entity.StudyRoom;
import com.oddok.server.domain.user.entity.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Participant {
    @Id
    @GeneratedValue
    Long id;

    @ManyToOne
    @JoinColumn(name = "study_room_id")
    private StudyRoom studyRoom;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "join_time")
    private LocalDateTime joinTime;

    @Builder
    public Participant (StudyRoom studyRoom, User user) {
        this.studyRoom = studyRoom;
        this.user = user;
        this.joinTime = LocalDateTime.now();
    }
}
