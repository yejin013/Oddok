package com.oddok.server.domain.timerecord.mapper;

import com.oddok.server.domain.timerecord.api.request.CreateTimeRecordRequest;
import com.oddok.server.domain.timerecord.api.response.GetTimeRecordResponse;
import com.oddok.server.domain.timerecord.dto.TimeRecordDto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface TimeRecordDtoMapper {
    TimeRecordDto fromCreateRequest(CreateTimeRecordRequest request);
    GetTimeRecordResponse toGetResponse(TimeRecordDto dto);
    List<GetTimeRecordResponse> toGetResponse(List<TimeRecordDto> dtos);
}
