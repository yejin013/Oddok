package com.oddok.server.domain.user.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 255)
    private String email;

    @Column(length = 8)
    private String nickname;

    @CreatedDate
    @Column(name = "create_at")
    private LocalDateTime createAt;

    @LastModifiedDate
    @Column(name = "update_at")
    private LocalDateTime updateAt;

    @Builder
    public User(String email, String nickname) {
        this.email = email;
        this.nickname = nickname;
        this.createAt = LocalDateTime.now();
        this.updateAt = LocalDateTime.now();
    }

    public User changeNickname(String nickname) {
        this.nickname = nickname;
        return this;
    }
}
