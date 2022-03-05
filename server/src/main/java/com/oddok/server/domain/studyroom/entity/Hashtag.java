package com.oddok.server.domain.studyroom.entity;

import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Getter
@Entity
public class Hashtag {
    @Id
    @GeneratedValue
    Long id;

    @Column(name = "study_room_id")
    private StudyRoom studyRoom;

    @Column(length = 8)
    private String name;
}
