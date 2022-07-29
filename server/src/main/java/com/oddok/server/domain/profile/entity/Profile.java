package com.oddok.server.domain.profile.entity;

import com.oddok.server.domain.user.entity.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DiscriminatorValue("user_profile")
@Table(name = "user_profile")
public class Profile extends User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 255)
    private String goal;

    @Column(name = "target_time")
    private Integer targetTime;

    @Column(name = "d_day")
    private LocalDate dday;

    @Column(name = "d_day_infomation")
    private String ddayInfo;

    @Builder
    public Profile(String goal, Integer targetTime, LocalDate dday, String ddayInfo) {
        this.goal = goal;
        this.targetTime = targetTime;
        this.dday = dday;
        this.ddayInfo = ddayInfo;
    }

    public void update(String goal, Integer targetTime, LocalDate dday, String ddayInfo) {
        this.goal = goal;
        this.targetTime = targetTime;
        this.dday = dday;
        this.ddayInfo = ddayInfo;
    }
}
