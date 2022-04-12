package com.oddok.server.domain.studyroom.mapper;

import com.oddok.server.common.mapper.GenericRequestMapper;
import com.oddok.server.domain.studyroom.api.request.CreateStudyRoomRequest;
import com.oddok.server.domain.studyroom.dto.StudyRoomDto;
import org.mapstruct.Mapper;

@Mapper
public interface CreateStudyRoomRequestMapper extends GenericRequestMapper<CreateStudyRoomRequest, StudyRoomDto> {
    StudyRoomDto toDto(CreateStudyRoomRequest request);
}
