package com.oddok.server.domain.timerecord.mapper;

import com.oddok.server.common.mapper.GenericMapper;
import com.oddok.server.domain.timerecord.dto.TimeRecordDto;
import com.oddok.server.domain.timerecord.entity.TimeRecord;
import org.mapstruct.Mapper;

@Mapper
public interface TimeRecordMapper extends GenericMapper<TimeRecordDto, TimeRecord> {
    TimeRecordDto toDto(TimeRecord entity);
}
