package com.oddok.server.domain.user.entity;

import io.jsonwebtoken.Claims;
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
    private String userId;

    @Column(length = 8)
    private String nickname;

    @Column(name = "refresh_token")
    private String refreshToken;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @CreatedDate
    @Column(name = "create_at")
    private LocalDateTime createAt;

    @LastModifiedDate
    @Column(name = "update_at")
    private LocalDateTime updateAt;

    @Builder
    public User(String userId, String nickname, Role role) {
        this.userId = userId;
        this.nickname = nickname;
        this.role = role ;
        this.createAt = LocalDateTime.now();
        this.updateAt = LocalDateTime.now();
    }

    public User(Claims claims) {
        this.id = Long.valueOf(claims.get("id").toString());
        this.userId = claims.get("userId").toString();
        this.role = Role.valueOf(claims.get("role").toString());
    }

    public void updateRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public void changeNickname(String nickname) {
        this.nickname = nickname;
    }
}
