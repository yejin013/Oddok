package com.oddok.server.domain.timerecord.mapper;

import com.oddok.server.domain.timerecord.api.request.CreateTimeRecordRequest;
import com.oddok.server.domain.timerecord.dto.TimeRecordDto;
import org.mapstruct.Mapper;

@Mapper
public interface TimeRecordRequestMapper {
    TimeRecordDto toDto(CreateTimeRecordRequest request);
}
