package com.oddok.server.domain.timerecord.application;

import com.oddok.server.common.errors.UserNotFoundException;
import com.oddok.server.domain.timerecord.dao.TimeRecordRepository;
import com.oddok.server.domain.timerecord.dto.TimeRecordDto;
import com.oddok.server.domain.timerecord.mapper.TimeRecordMapper;
import com.oddok.server.domain.user.dao.UserRepository;
import com.oddok.server.domain.user.entity.User;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Service;

@Service
public class TimeRecordService {

    private final TimeRecordRepository timeRecordRepository;

    private final TimeRecordMapper timeRecordMapper;

    public TimeRecordService(TimeRecordRepository timeRecordRepository) {
        this.timeRecordRepository = timeRecordRepository;
        this.timeRecordMapper = Mappers.getMapper(TimeRecordMapper.class);
    }

    public void createTimeRecord(TimeRecordDto timeRecordDto) {
        timeRecordMapper.toDto(timeRecordRepository.save(timeRecordMapper.toEntity(timeRecordDto)));
    }
}
