package com.oddok.server.domain.studyroom.mapper;

import com.oddok.server.domain.studyroom.api.response.GetStudyRoomResponse;
import com.oddok.server.domain.studyroom.api.response.UpdateStudyRoomResponse;
import com.oddok.server.domain.studyroom.dto.StudyRoomDto;
import org.mapstruct.Mapper;

@Mapper
public interface StudyRoomResponseMapper {
    UpdateStudyRoomResponse toUpdateStudyRoomResponse(StudyRoomDto studyRoomDto);
    GetStudyRoomResponse toGetStudyRoomResponse(StudyRoomDto studyRoomDto);
}
