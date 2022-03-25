package com.oddok.server.domain.studyroom.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor
public class Hashtag {
    @Id
    @GeneratedValue
    Long id;

    @Column(length = 8, unique = true)
    private String name;

    @Builder
    public Hashtag(String name) {
        this.name = name;
    }
}
