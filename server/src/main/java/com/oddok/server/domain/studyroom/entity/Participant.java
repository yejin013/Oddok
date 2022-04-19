package com.oddok.server.domain.studyroom.entity;

import com.oddok.server.domain.user.entity.User;
import lombok.Builder;
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

    @Column(name = "study_room_id")
    private Long studyRoomId;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "join_time")
    private LocalDateTime joinTime;

    @Builder
    public Participant (Long studyRoomId, User user) {
        this.studyRoomId = studyRoomId;
        this.user = user;
        this.joinTime = LocalDateTime.now();
    }
}
