package com.oddok.server.domain.timerecord.api;

import com.oddok.server.domain.timerecord.api.request.CreateTimeRecordRequest;
import com.oddok.server.domain.timerecord.api.request.GetTimeRecordByDayRequest;
import com.oddok.server.domain.timerecord.api.response.GetTimeRecordResponse;
import com.oddok.server.domain.timerecord.application.TimeRecordService;
import com.oddok.server.domain.timerecord.dto.TimeRecordDto;
import com.oddok.server.domain.timerecord.mapper.TimeRecordDtoMapper;
import com.oddok.server.domain.user.entity.User;
import org.mapstruct.factory.Mappers;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/time-record")
public class TimeRecordController {

    private TimeRecordService timeRecordService;

    private TimeRecordDtoMapper timeRecordDtoMapper;

    public TimeRecordController(TimeRecordService timeRecordService) {
        this.timeRecordService = timeRecordService;

        timeRecordDtoMapper = Mappers.getMapper(TimeRecordDtoMapper.class);
    }

    /**
     * [POST] /time-record : 시간 기록 API
     * @param createTimeRecordRequest
     */
    @PostMapping
    public void create(@AuthenticationPrincipal User user, @RequestBody @Valid CreateTimeRecordRequest createTimeRecordRequest) {
        System.out.println(user);
        TimeRecordDto requestDto = timeRecordDtoMapper.fromCreateRequest(createTimeRecordRequest);
        timeRecordService.create(user.getId(), requestDto);
    }

    /**
     * [GET] /time-record/today : 당일 시간표 조회 API
     * @param userId
     * @return List<GetTimeRecordResponse>
     */
    @GetMapping("/today")
    public ResponseEntity<List<GetTimeRecordResponse>> get(@RequestHeader String userId) {
        List<TimeRecordDto> timeRecordDtoList = timeRecordService.get(Long.parseLong(userId));
        List<GetTimeRecordResponse> getTimeRecordResponse = timeRecordDtoMapper.toGetResponse(timeRecordDtoList);
        return ResponseEntity.ok(getTimeRecordResponse);
    }

    /**
     * [GET] /time-record : 원하는 날짜의 시간표 조회 API
     * @param userId
     * @return List<GetTimeRecordResponse>
     */
    @GetMapping
    public ResponseEntity<List<GetTimeRecordResponse>> get(@RequestHeader String userId, @RequestParam("date") String date) {
        List<TimeRecordDto> timeRecordDtoList = timeRecordService.get(Long.parseLong(userId), date);
        List<GetTimeRecordResponse> getTimeRecordResponses = timeRecordDtoMapper.toGetResponse(timeRecordDtoList);
        return ResponseEntity.ok(getTimeRecordResponses);
    }
}
