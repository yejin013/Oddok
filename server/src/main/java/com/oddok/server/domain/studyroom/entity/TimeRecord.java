package com.oddok.server.domain.studyroom.entity;

import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Getter
@Entity
public class TimeRecord {
    @Id
    @GeneratedValue
    Long id;

    @Column(name = "user_id")
    private User user;

    private LocalDateTime start_time;

    private LocalDateTime end_time;

    @Column(length = 30)
    private String subject;

    private LocalDateTime day;
}
