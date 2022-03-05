package com.oddok.server.domain.user.entity;

import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Getter
@Entity
public class User {
    @Id
    @GeneratedValue
    private Long id;

    @Column(unique = true, length = 255)
    private String email;

    @Column(unique = true, length = 8)
    private String nickname;

    @Column(length = 255)
    private String goal;

    @Column(name = "target_time")
    private LocalDateTime targetTime;

    @Column(name = "d_day")
    private LocalDateTime dDay;

    @CreatedDate
    @Column(name = "create_at")
    private LocalDateTime createAt;

    @LastModifiedDate
    @Column(name = "update_at")
    private LocalDateTime updateAt;
}
