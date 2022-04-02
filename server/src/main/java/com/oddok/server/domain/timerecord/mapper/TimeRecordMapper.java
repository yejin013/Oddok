package com.oddok.server.domain.timerecord.mapper;

import com.oddok.server.domain.timerecord.dto.TimeRecordDto;
import com.oddok.server.domain.timerecord.entity.TimeRecord;
import org.mapstruct.Mapper;

@Mapper
public interface TimeRecordMapper {
    TimeRecordDto toDto(TimeRecord entity);
    TimeRecord toEntity(TimeRecordDto dto);
}
