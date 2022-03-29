package com.oddok.server.domain.timerecord.entity;

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

    private Long userId;

    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;

    @Column(length = 30)
    private String subject;

    @Builder
    public TimeRecord(Long userId, LocalDateTime startTime, LocalDateTime endTime, String subject) {
        this.userId = userId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.subject = subject;
    }
}
