package com.oddok.server.domain.studyroom.mapper;

import com.oddok.server.domain.studyroom.api.request.UpdateStudyRoomRequest;
import com.oddok.server.domain.studyroom.dto.StudyRoomDto;
import org.mapstruct.Mapper;

@Mapper
public interface UpdateStudyRoomRequestMapper {
    StudyRoomDto toDto(UpdateStudyRoomRequest request);
}
