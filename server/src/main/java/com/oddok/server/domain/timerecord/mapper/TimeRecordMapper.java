package com.oddok.server.domain.timerecord.mapper;

import com.oddok.server.domain.timerecord.dto.TimeRecordDto;
import com.oddok.server.domain.timerecord.entity.TimeRecord;
import com.oddok.server.domain.user.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper
public interface TimeRecordMapper {
    TimeRecordDto toDto(TimeRecord entity);
    List<TimeRecordDto> toDto(List<TimeRecord> timeRecords);
    @Mapping(source = "user", target = "user")
    TimeRecord toEntity(TimeRecordDto dto, User user);
}
