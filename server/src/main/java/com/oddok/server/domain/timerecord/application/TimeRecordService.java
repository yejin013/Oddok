package com.oddok.server.domain.timerecord.application;

import com.oddok.server.common.errors.UserNotFoundException;
import com.oddok.server.domain.timerecord.dao.TimeRecordRepository;
import com.oddok.server.domain.timerecord.dto.TimeRecordDto;
import com.oddok.server.domain.timerecord.entity.TimeRecord;
import com.oddok.server.domain.timerecord.mapper.TimeRecordMapper;
import com.oddok.server.domain.user.dao.UserRepository;
import com.oddok.server.domain.user.entity.User;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
public class TimeRecordService {

    private final TimeRecordRepository timeRecordRepository;
    private final UserRepository userRepository;

    private final TimeRecordMapper timeRecordMapper;

    public TimeRecordService(TimeRecordRepository timeRecordRepository, UserRepository userRepository) {
        this.timeRecordRepository = timeRecordRepository;
        this.userRepository = userRepository;

        this.timeRecordMapper = Mappers.getMapper(TimeRecordMapper.class);
    }

    public void create(Long userId, TimeRecordDto timeRecordDto) {
        User user = findUser(userId);
        TimeRecord timeRecord = timeRecordRepository.save(timeRecordMapper.toEntity(timeRecordDto, user));
        timeRecordMapper.toDto(timeRecord);
    }

    /**
     * 해당 유저의 당일 날짜에 해당하는 시간표만 조회
     */
    public List<TimeRecordDto> get(Long userId) {
        User user = findUser(userId);
        LocalDateTime startDatetime = LocalDateTime.of(LocalDate.now(), LocalTime.of(0,0,0)); //어제 00:00:00
        LocalDateTime endDatetime = LocalDateTime.of(LocalDate.now(), LocalTime.of(23,59,59));
        List<TimeRecord> timeRecords = timeRecordRepository.findAllByUserAndStartTimeBetween(user, startDatetime, endDatetime);
        return timeRecordMapper.toDto(timeRecords);
    }

    private User findUser(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));
    }
}
