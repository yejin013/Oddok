package com.oddok.server.domain.timerecord.api;

import com.oddok.server.domain.timerecord.api.request.CreateTimeRecordRequest;
import com.oddok.server.domain.timerecord.api.request.GetTimeRecordByDayRequest;
import com.oddok.server.domain.timerecord.api.response.GetTimeRecordResponse;
import com.oddok.server.domain.timerecord.application.TimeRecordService;
import com.oddok.server.domain.timerecord.dto.TimeRecordDto;
import com.oddok.server.domain.timerecord.mapper.TimeRecordDtoMapper;
import org.mapstruct.factory.Mappers;
import org.springframework.http.ResponseEntity;
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
     * @param userId
     * @param createTimeRecordRequest
     */
    @PostMapping
    public void create(@RequestHeader String userId, @RequestBody @Valid CreateTimeRecordRequest createTimeRecordRequest) {
        TimeRecordDto requestDto = timeRecordDtoMapper.fromCreateRequest(createTimeRecordRequest);
        timeRecordService.create(Long.parseLong(userId), requestDto);
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
     * @param getTimeRecordByDayRequest : 원하는 날짜
     * @return List<GetTimeRecordResponse>
     */
    @GetMapping
    public ResponseEntity<List<GetTimeRecordResponse>> get(@RequestHeader String userId, @RequestBody GetTimeRecordByDayRequest getTimeRecordByDayRequest) {
        List<TimeRecordDto> timeRecordDtoList = timeRecordService.get(Long.parseLong(userId), getTimeRecordByDayRequest.getDay());
        List<GetTimeRecordResponse> getTimeRecordResponses = timeRecordDtoMapper.toGetResponse(timeRecordDtoList);
        return ResponseEntity.ok(getTimeRecordResponses);
    }
}
