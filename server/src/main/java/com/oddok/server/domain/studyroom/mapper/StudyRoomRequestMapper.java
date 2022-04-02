package com.oddok.server.domain.studyroom.mapper;

import com.oddok.server.domain.studyroom.api.request.CreateStudyRoomRequest;
import com.oddok.server.domain.studyroom.api.request.UpdateStudyRoomRequest;
import com.oddok.server.domain.studyroom.dto.StudyRoomDto;
import org.mapstruct.Mapper;

@Mapper
public interface StudyRoomRequestMapper {
    StudyRoomDto toDto(CreateStudyRoomRequest request);
    StudyRoomDto toDto(UpdateStudyRoomRequest request);
}
