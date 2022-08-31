package com.oddok.server.domain.profile.entity;

import com.oddok.server.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@Entity
@NoArgsConstructor
@Table(name = "user_profile")
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private User user;

    @Column(length = 255)
    private String goal;

    @Column(name = "target_time")
    private Integer targetTime;

    @Column(name = "d_day")
    private LocalDate dday;

    @Column(name = "d_day_infomation")
    private String ddayInfo;

    @Builder
    public Profile(User user, String goal, Integer targetTime, LocalDate dday, String ddayInfo) {
        this.user = user;
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
