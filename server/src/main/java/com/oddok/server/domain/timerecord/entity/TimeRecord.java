package com.oddok.server.domain.timerecord.entity;

import com.oddok.server.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor
public class TimeRecord {
    @Id
    @GeneratedValue
    Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private LocalDateTime start_time;

    private LocalDateTime end_time;

    @Column(length = 30)
    private String subject;

    @Builder
    public TimeRecord(User user, LocalDateTime start_time, LocalDateTime end_time, String subject) {
        this.user = user;
        this.start_time = start_time;
        this.end_time = end_time;
        this.subject = subject;
    }
}
