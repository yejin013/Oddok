package com.oddok.server.domain.studyroom.entity;

import com.oddok.server.domain.user.entity.User;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor
public class StudyRoom {
    @Id
    @GeneratedValue
    Long id;

    @Column(unique = true, nullable = false, length = 255)
    private String name;

    private String category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "session_id")
    private String sessionId;

    private String image;

    @Column(name = "is_publlic")
    private Boolean isPublic;

    @Column(length = 255)
    private String password;

    @Column(name = "target_time")
    private Integer targetTime;

    private String rule;

    @Column(name = "is_mic_on")
    private Boolean isMicOn;

    @Column(name = "is_cam_on")
    private Boolean isCamOn;

    @Column(name = "current_users")
    private Integer currentUsers = 0;

    @Column(name = "limit_users")
    private Integer limitUsers;

    @Column(name = "start_at")
    private LocalDateTime startAt;

    @Column(name = "end_at")
    private LocalDateTime endAt;

    @CreatedDate
    @Column(name = "create_at")
    private LocalDateTime createAt;

    @OneToMany(mappedBy = "studyRoom", fetch = FetchType.LAZY)
    private List<StudyRoomHashtag> hashtags;

    @Builder
    public StudyRoom(String name, String category, User user,
                     String sessionId, String image, Boolean isPublic,
                     String password, Integer targetTime, String rule,
                     Boolean isMicOn, Boolean isCamOn, Integer limitUsers,
                     List<StudyRoomHashtag> hashtags,
                     LocalDateTime startAt, LocalDateTime endAt) {
        this.name = name;
        this.category = category;
        this.user = user;
        this.sessionId = sessionId;
        this.image = image;
        this.isPublic = isPublic;
        this.password = password;
        this.targetTime = targetTime;
        this.rule = rule;
        this.isMicOn = isMicOn;
        this.isCamOn = isCamOn;
        this.limitUsers = limitUsers;
        this.hashtags = hashtags;
        this.startAt = startAt;
        this.endAt = endAt;
        this.createAt = LocalDateTime.now();
    }

    public StudyRoom update(String name, String category) {
        this.name = name;
        this.category = category;
        return this;
    }

    public StudyRoom update(String name, String category, String image, Boolean isPublic,
                            String password, Integer targetTime, String rule, Boolean isMicOn,
                            Boolean isCamOn, Integer limitUsers, LocalDateTime startAt, LocalDateTime endAt) {
        this.name = name;
        this.category = category;
        this.image = image;
        this.isPublic = isPublic;

        if(!isPublic)
            this.password = null;

        this.password = password;
        this.targetTime = targetTime;
        this.rule = rule;
        this.isMicOn = isMicOn;
        this.isCamOn = isCamOn;
        this.limitUsers = limitUsers;
        this.startAt = startAt;
        this.endAt = endAt;

        return this;
    }
}
