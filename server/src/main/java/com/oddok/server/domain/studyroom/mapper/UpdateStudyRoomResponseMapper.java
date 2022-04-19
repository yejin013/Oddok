package com.oddok.server.domain.studyroom.mapper;

import com.oddok.server.common.mapper.GenericResponseMapper;
import com.oddok.server.domain.studyroom.api.response.UpdateStudyRoomResponse;
import com.oddok.server.domain.studyroom.dto.StudyRoomDto;
import org.mapstruct.Mapper;

@Mapper
public interface UpdateStudyRoomResponseMapper extends GenericResponseMapper<UpdateStudyRoomResponse, StudyRoomDto> {
    UpdateStudyRoomResponse toResponse(StudyRoomDto studyRoomDto);
}
