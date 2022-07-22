package com.oddok.server.domain.timerecord.application;

import com.oddok.server.domain.timerecord.dao.TimeRecordRepository;
import com.oddok.server.domain.timerecord.dto.TimeRecordDto;
import com.oddok.server.domain.timerecord.entity.TimeRecord;
import com.oddok.server.domain.timerecord.mapper.TimeRecordMapper;
import com.oddok.server.domain.user.entity.User;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class TimeRecordService {

    private final TimeRecordRepository timeRecordRepository;

    private final TimeRecordMapper timeRecordMapper;

    public TimeRecordService(TimeRecordRepository timeRecordRepository) {
        this.timeRecordRepository = timeRecordRepository;

        this.timeRecordMapper = Mappers.getMapper(TimeRecordMapper.class);
    }

    public void create(User user, TimeRecordDto timeRecordDto) {
        TimeRecord timeRecord = timeRecordRepository.save(timeRecordMapper.toEntity(timeRecordDto, user));
        timeRecordMapper.toDto(timeRecord);
    }

    /**
     * 해당 유저의 당일 날짜에 해당하는 시간표만 조회
     */
    public List<TimeRecordDto> get(User user) {
        LocalDate day = LocalDate.now();
        LocalDateTime startDatetime = day.atStartOfDay(); // 오늘 00:00:00
        LocalDateTime endDatetime = day.atTime(23, 59, 59); // 오늘 23:59:59
        List<TimeRecord> timeRecords = timeRecordRepository.findAllByUserAndStartTimeBetween(user, startDatetime, endDatetime);
        return timeRecordMapper.toDto(timeRecords);
    }

    /**
     * 해당 날짜의 타임레코드 가져오기
     */
    public List<TimeRecordDto> get(User user, String date) {
        LocalDate day = LocalDate.parse(date);
        LocalDateTime startDatetime = day.atStartOfDay(); // 오늘 00:00:00
        LocalDateTime endDatetime = day.atTime(23, 59, 59); // 오늘 23:59:59
        List<TimeRecord> timeRecords = timeRecordRepository.findAllByUserAndStartTimeBetween(user, startDatetime, endDatetime);
        return timeRecordMapper.toDto(timeRecords);
    }

    /**
     * 일주일 지난 타임레코드 가져오기
     */
    public List<TimeRecordDto> get() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime aWeekAgo = now.minusDays(7);
        List<TimeRecord> timeRecords = timeRecordRepository.findAllByEndTimeLessThan(aWeekAgo);
        return timeRecordMapper.toDto(timeRecords);
    }

    /**
     * timeRecord 삭제
     */
    public void delete(Long id) {
        timeRecordRepository.deleteById(id);
    }
}
