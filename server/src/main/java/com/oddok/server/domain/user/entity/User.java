package com.oddok.server.domain.user.entity;

import io.jsonwebtoken.Claims;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
@DiscriminatorValue("User")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends Auth {

    @Column(length = 8)
    private String nickname;

    @Column(name = "refresh_token")
    private String refreshToken;

    @CreatedDate
    @Column(name = "create_at")
    private LocalDateTime createAt;

    @LastModifiedDate
    @Column(name = "update_at")
    private LocalDateTime updateAt;

    @Builder
    public User(String userId, String nickname, Role role) {
        super(userId, role);
        this.nickname = nickname;
        this.createAt = LocalDateTime.now();
        this.updateAt = LocalDateTime.now();
    }

    public void updateRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public void changeNickname(String nickname) {
        this.nickname = nickname;
    }

}
