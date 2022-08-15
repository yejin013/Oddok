package com.oddok.server.domain.studyroom.mapper;

import com.oddok.server.domain.studyroom.api.request.CreateStudyRoomRequest;
import com.oddok.server.domain.studyroom.api.request.UpdateStudyRoomRequest;
import com.oddok.server.domain.studyroom.api.response.GetStudyRoomListEntityResponse;
import com.oddok.server.domain.studyroom.api.response.GetStudyRoomResponse;
import com.oddok.server.domain.studyroom.api.response.UpdateStudyRoomResponse;
import com.oddok.server.domain.studyroom.dto.StudyRoomDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface StudyRoomDtoMapper {

    @Mapping(source = "studyRoomId", target = "id")
    @Mapping(target = "currentUsers", ignore = true)
    StudyRoomDto fromUpdateRequest(UpdateStudyRoomRequest request, Long studyRoomId);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "sessionId", ignore = true)
    StudyRoomDto fromCreateRequest(CreateStudyRoomRequest request);

    GetStudyRoomResponse toGetResponse(StudyRoomDto studyRoomDto);

    GetStudyRoomListEntityResponse toGetResponseList(StudyRoomDto studyRoomDto);

    UpdateStudyRoomResponse toUpdateResponse(StudyRoomDto studyRoomDto);


}
