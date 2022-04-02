package com.oddok.server.domain.studyroom.mapper;

import com.oddok.server.domain.studyroom.api.request.CreateStudyRoomRequest;
import com.oddok.server.domain.studyroom.api.request.UpdateStudyRoomRequest;
import com.oddok.server.domain.studyroom.api.response.CreateStudyRoomResponse;
import com.oddok.server.domain.studyroom.api.response.GetStudyRoomResponse;
import com.oddok.server.domain.studyroom.api.response.UpdateStudyRoomResponse;
import com.oddok.server.domain.studyroom.dto.StudyRoomDto;
import org.mapstruct.Mapper;

@Mapper
public interface StudyRoomDtoMapper {

    StudyRoomDto fromUpdateRequest(UpdateStudyRoomRequest updateStudyRoomRequest);

    StudyRoomDto fromCreateRequest(CreateStudyRoomRequest request);

    GetStudyRoomResponse toGetResponse(StudyRoomDto studyRoomDto);

    UpdateStudyRoomResponse toUpdateResponse(StudyRoomDto studyRoomDto);


}
