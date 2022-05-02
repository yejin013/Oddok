package com.oddok.server.domain.studyroom.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Hashtag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(length = 8, unique = true)
    private String name;

    @Builder
    public Hashtag(String name) {
        this.name = name;
    }
}
