package com.oddok.server.domain.user.entity;

import io.jsonwebtoken.Claims;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@DiscriminatorColumn
@NoArgsConstructor
public class Auth {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 255)
    private String userId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    public Auth(String userId, Role role) {
        this.userId = userId;
        this.role = role;
    }

    public Auth(Claims claims) {
        this.id = Long.valueOf(claims.get("id").toString());
        this.userId = claims.get("userId").toString();
        this.role = Role.valueOf(claims.get("role").toString());
    }

    public void setId(Long id) {
        this.id = id;
    }
}
