package com.oddok.server.domain.timerecord.entity;

import com.oddok.server.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor
public class TimeRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;

    @Column(length = 30)
    private String subject;

    @Builder
    public TimeRecord(User user, LocalDateTime startTime, LocalDateTime endTime, String subject) {
        this.user = user;
        this.startTime = startTime;
        this.endTime = endTime;
        this.subject = subject;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
