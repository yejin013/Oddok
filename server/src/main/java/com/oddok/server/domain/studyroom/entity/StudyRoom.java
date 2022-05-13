package com.oddok.server.domain.studyroom.entity;

import com.oddok.server.domain.studyroom.dto.StudyRoomDto;
import com.oddok.server.domain.user.entity.User;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class StudyRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String name;

    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", unique = true)
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

    @Column(name = "bgm")
    private String bgm;

    @Column(name = "current_users")
    private Integer currentUsers;

    @Column(name = "limit_users")
    private Integer limitUsers;

    @Column(name = "end_at")
    private LocalDate endAt;

    @CreatedDate
    @Column(name = "create_at")
    private LocalDateTime createAt;

    @OneToMany(mappedBy = "studyRoom",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private Set<StudyRoomHashtag> hashtags;

    public void createSession(String sessionId) {
        this.sessionId = sessionId;
    }

    public void deleteSession() {
        this.sessionId = null;
    }

    public String getDefaultNameToCreate() {
        return category.getValue() + " n호실";
    }

    public String getDefaultNameToUpdate() {
        return category.getValue() + " " + id + "호실";
    }

    @Builder
    public StudyRoom(String name, String category, User user,
                     String image, Boolean isPublic, String password,
                     Integer targetTime, String rule, Boolean isMicOn,
                     Boolean isCamOn, String bgm, Integer limitUsers,
                     LocalDate endAt) {
        this.category = Category.valueOf(category);
        this.name = Objects.requireNonNullElseGet(name, this::getDefaultNameToCreate);
        this.user = user;
        this.image = image;
        this.isPublic = isPublic;
        this.password = password;
        this.targetTime = targetTime;
        this.rule = rule;
        this.isMicOn = isMicOn;
        this.isCamOn = isCamOn;
        this.bgm = bgm;
        this.limitUsers = limitUsers;
        this.endAt = endAt;
        this.createAt = LocalDateTime.now();
        this.hashtags = new HashSet<>();
        this.currentUsers = 0;
    }

    public void update(StudyRoomDto studyRoomDto) {
        this.category = studyRoomDto.getCategory();
        this.name = Objects.requireNonNullElseGet(studyRoomDto.getName(), this::getDefaultNameToUpdate);
        this.image = studyRoomDto.getImage();
        this.isPublic = studyRoomDto.getIsPublic();

        if (studyRoomDto.getIsPublic()) {
            this.password = null;
        }

        this.password = studyRoomDto.getPassword();
        this.targetTime = studyRoomDto.getTargetTime();
        this.rule = studyRoomDto.getRule();
        this.isMicOn = studyRoomDto.getIsMicOn();
        this.isCamOn = studyRoomDto.getIsCamOn();
        this.bgm = studyRoomDto.getBgm();
        this.limitUsers = studyRoomDto.getLimitUsers();
        this.endAt = studyRoomDto.getEndAt();

        updateHashtag(studyRoomDto.getHashtags());
    }

    public void addHashtag(Hashtag hashtag) {
        StudyRoomHashtag studyRoomHashtag = StudyRoomHashtag.builder().studyRoom(this).hashtag(hashtag)
                .build();
        this.hashtags.add(studyRoomHashtag);
    }

    private void updateHashtag(Set<String> newHashtags) {
        Set<StudyRoomHashtag> toBeDeletedHashtags = new HashSet<>();
        for (StudyRoomHashtag studyRoomHashtag : hashtags) {
            // 새로운 해시태그 중에 스터디룸의 기존 해시태그가 있으면 등록할 필요 없으므로 삭제
            if (!newHashtags.remove(studyRoomHashtag.getHashtag().getName())) {
                // 스터디룸의 기존해시태그가 새로운 해시태그에 없는 경우 삭제할 리스트에 추가
                toBeDeletedHashtags.add(studyRoomHashtag);
            }
        }
        hashtags.removeIf(toBeDeletedHashtags::contains);
    }

    public void increaseCurrentUsers() {
        this.currentUsers++;
    }

    public void decreaseCurrentUsers() {
        this.currentUsers--;
    }

}
