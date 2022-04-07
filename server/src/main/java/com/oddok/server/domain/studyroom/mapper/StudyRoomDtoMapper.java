package com.oddok.server.domain.studyroom.mapper;

import com.oddok.server.domain.studyroom.api.request.CreateStudyRoomRequest;
import com.oddok.server.domain.studyroom.api.request.UpdateStudyRoomRequest;
import com.oddok.server.domain.studyroom.api.response.GetStudyRoomResponse;
import com.oddok.server.domain.studyroom.api.response.UpdateStudyRoomResponse;
import com.oddok.server.domain.studyroom.dto.StudyRoomDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface StudyRoomDtoMapper {

    @Mapping(source = "userId", target = "userId")
    @Mapping(source = "studyRoomId", target = "id")
    StudyRoomDto fromUpdateRequest(UpdateStudyRoomRequest request, Long userId, Long studyRoomId);

    @Mapping(source = "userId", target="userId")
    @Mapping(source = "sessionId", target="sessionId")
    StudyRoomDto fromCreateRequest(CreateStudyRoomRequest request, String userId, String sessionId);

    GetStudyRoomResponse toGetResponse(StudyRoomDto studyRoomDto);

    UpdateStudyRoomResponse toUpdateResponse(StudyRoomDto studyRoomDto);


}
