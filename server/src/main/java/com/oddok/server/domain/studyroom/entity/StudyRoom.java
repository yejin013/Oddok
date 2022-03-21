package com.oddok.server.domain.studyroom.entity;

import com.oddok.server.domain.studyroom.dto.StudyRoomDto;
import com.oddok.server.domain.user.entity.User;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

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

    //TODO: 생성자 인자 수정
    @Builder
    public StudyRoom(String name, User user, String sessionId) {
        this.name = name;
        this.user = user;
        this.sessionId = sessionId;
        this.createAt = LocalDateTime.now();
    }

    /*
    public StudyRoom(String name, User user, String sessionId,
                     String image, Boolean isPublic, String password,
                     Integer targetTime, String rule, Integer limitUsers,
                     LocalDateTime startAt, LocalDateTime endAt) {
        this.name = name;
        this.user = user;
        this.sessionId = sessionId;
        this.image = image;
        this.isPublic = isPublic;
        this.password = password;
        this.targetTime = targetTime;
        this.rule = rule;
        this.currentUsers = 0;
        this.limitUsers = limitUsers;
        this.startAt = startAt;
        this.endAt = endAt;
        this.createAt = LocalDateTime.now();
    }
     */

    public StudyRoomDto toStudyRoomDto() {
        return StudyRoomDto.builder()
                .id(id)
                .name(name)
                .user(user.toUserDto())
                .sessionId(sessionId)
                .image(image)
                .isPublic(isPublic)
                .password(password)
                .targetTime(targetTime)
                .rule(rule)
                .currentUsers(currentUsers)
                .limitUsers(limitUsers)
                .startAt(startAt)
                .endAt(endAt)
                .build();
    }

}
