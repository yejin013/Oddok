package com.oddok.server.domain.studyroom.mapper;

import com.oddok.server.common.mapper.GenericMapper;
import com.oddok.server.domain.studyroom.dto.StudyRoomDto;
import com.oddok.server.domain.studyroom.entity.StudyRoom;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface StudyRoomMapper extends GenericMapper<StudyRoomDto, StudyRoom> {
    @Mapping(source = "user.id", target = "userId")
    StudyRoomDto toDto(StudyRoom entity);
}
