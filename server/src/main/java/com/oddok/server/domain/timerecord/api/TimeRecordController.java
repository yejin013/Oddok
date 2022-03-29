package com.oddok.server.domain.timerecord.api;

import com.oddok.server.domain.timerecord.api.request.CreateTimeRecordRequest;
import com.oddok.server.domain.timerecord.application.TimeRecordService;
import com.oddok.server.domain.timerecord.dto.TimeRecordDto;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/time-record")
public class TimeRecordController {

    private TimeRecordService timeRecordService;

    public TimeRecordController(TimeRecordService timeRecordService) {
        this.timeRecordService = timeRecordService;
    }

    /**
     * [POST] /time-record : 시간 기록 API
     * @param userId
     * @param createTimeRecordRequest
     */
    @PostMapping
    public void create(@RequestHeader String userId, @RequestBody @Valid CreateTimeRecordRequest createTimeRecordRequest) {
        TimeRecordDto requestDto = TimeRecordDto.builder()
                .userId(Long.parseLong(userId))
                .startTime(createTimeRecordRequest.getStartTime())
                .endTime(createTimeRecordRequest.getEndTime())
                .subject(createTimeRecordRequest.getSubject())
                .build();

        timeRecordService.createTimeRecord(requestDto);
    }
}
