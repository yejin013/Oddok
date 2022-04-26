package com.oddok.server.domain.timerecord.dao;

import com.oddok.server.domain.timerecord.entity.TimeRecord;
import com.oddok.server.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface TimeRecordRepository extends JpaRepository<TimeRecord, Long> {
    List<TimeRecord> findAllByUserAndStartTimeBetween(User user, LocalDateTime startTime, LocalDateTime endTime);
    List<TimeRecord> findAllByEndTimeLessThan(LocalDateTime endTime);
}
