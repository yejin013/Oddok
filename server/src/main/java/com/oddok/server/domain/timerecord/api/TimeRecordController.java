package com.oddok.server.domain.timerecord.api;

import com.oddok.server.domain.timerecord.api.request.CreateTimeRecordRequest;
import com.oddok.server.domain.timerecord.application.TimeRecordService;
import com.oddok.server.domain.timerecord.dto.TimeRecordDto;
import com.oddok.server.domain.timerecord.mapper.TimeRecordMapper;
import com.oddok.server.domain.timerecord.mapper.TimeRecordRequestMapper;
import org.mapstruct.factory.Mappers;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/time-record")
public class TimeRecordController {

    private TimeRecordService timeRecordService;

    private TimeRecordRequestMapper timeRecordRequestMapper;

    public TimeRecordController(TimeRecordService timeRecordService) {
        this.timeRecordService = timeRecordService;

        timeRecordRequestMapper = Mappers.getMapper(TimeRecordRequestMapper.class);
    }

    /**
     * [POST] /time-record : 시간 기록 API
     * @param userId
     * @param createTimeRecordRequest
     */
    @PostMapping
    public void create(@RequestHeader String userId, @RequestBody @Valid CreateTimeRecordRequest createTimeRecordRequest) {
        TimeRecordDto requestDto = timeRecordRequestMapper.toDto(createTimeRecordRequest);
        requestDto.setUserId(Long.parseLong(userId));

        timeRecordService.createTimeRecord(requestDto);
    }
}
