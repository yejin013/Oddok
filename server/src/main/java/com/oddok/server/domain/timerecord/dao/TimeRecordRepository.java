package com.oddok.server.domain.timerecord.dao;

import com.oddok.server.domain.timerecord.entity.TimeRecord;
import com.oddok.server.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TimeRecordRepository extends JpaRepository<TimeRecord, Long> {
}
