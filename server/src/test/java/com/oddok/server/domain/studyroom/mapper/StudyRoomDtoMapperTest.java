package com.oddok.server.domain.studyroom.mapper;

import com.oddok.server.domain.studyroom.api.request.UpdateStudyRoomRequest;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

import static org.junit.jupiter.api.Assertions.*;

class StudyRoomDtoMapperTest {

    private StudyRoomDtoMapper dtoMapper = Mappers.getMapper(StudyRoomDtoMapper.class);

    @Test
    void fromUpdateRequest() {
        UpdateStudyRoomRequest
    }

    @Test
    void toUpdateResponse() {
    }
}