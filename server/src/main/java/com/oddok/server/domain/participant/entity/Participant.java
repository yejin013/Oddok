package com.oddok.server.domain.participant.entity;

import com.oddok.server.domain.studyroom.entity.StudyRoom;
import com.oddok.server.domain.user.entity.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Participant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "study_room_id")
    private StudyRoom studyRoom;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "user_id", unique = true)
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
