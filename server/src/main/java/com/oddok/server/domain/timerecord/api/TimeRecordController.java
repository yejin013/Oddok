package com.oddok.server.domain.timerecord.api;

import com.oddok.server.domain.timerecord.api.request.CreateTimeRecordRequest;
import com.oddok.server.domain.timerecord.application.TimeRecordService;
import com.oddok.server.domain.timerecord.dto.TimeRecordDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/time-record")
public class TimeRecordController {

    private TimeRecordService timeRecordService;

    public TimeRecordController(TimeRecordService timeRecordService) {
        this.timeRecordService = timeRecordService;
    }

    @PostMapping
    public void create(@RequestHeader String userId, @RequestBody @Valid CreateTimeRecordRequest createTimeRecordRequest) {
        TimeRecordDto requestDto = TimeRecordDto.builder().build();

        timeRecordService.createTimeRecord();
    }
}
