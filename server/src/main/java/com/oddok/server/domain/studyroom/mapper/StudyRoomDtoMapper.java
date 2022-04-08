package com.oddok.server.domain.studyroom.mapper;

import com.oddok.server.domain.studyroom.api.request.CreateStudyRoomRequest;
import com.oddok.server.domain.studyroom.api.request.UpdateStudyRoomRequest;
import com.oddok.server.domain.studyroom.api.response.GetStudyRoomListEntityResponse;
import com.oddok.server.domain.studyroom.api.response.GetStudyRoomResponse;
import com.oddok.server.domain.studyroom.api.response.UpdateStudyRoomResponse;
import com.oddok.server.domain.studyroom.dto.StudyRoomDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.data.domain.Page;

@Mapper
public interface StudyRoomDtoMapper {

    @Mapping(source = "userId", target = "userId")
    @Mapping(source = "studyRoomId", target = "id")
    @Mapping(target = "category", expression="java(Category.valueOf(request.getCategory()))")
    StudyRoomDto fromUpdateRequest(UpdateStudyRoomRequest request, Long userId, Long studyRoomId);

    @Mapping(source = "userId", target="userId")
    @Mapping(target = "category", expression="java(Category.valueOf(request.getCategory()))")
    StudyRoomDto fromCreateRequest(CreateStudyRoomRequest request, String userId);

    @Mapping(source = "category.value", target = "category")
    GetStudyRoomResponse toGetResponse(StudyRoomDto studyRoomDto);

    GetStudyRoomListEntityResponse toGetResponseList(StudyRoomDto studyRoomDto);

    @Mapping(source = "category.value", target = "category")
    UpdateStudyRoomResponse toUpdateResponse(StudyRoomDto studyRoomDto);


}
