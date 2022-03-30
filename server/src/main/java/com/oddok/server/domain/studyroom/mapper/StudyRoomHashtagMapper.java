package com.oddok.server.domain.studyroom.mapper;

import com.oddok.server.domain.studyroom.dto.StudyRoomHashtagDto;
import com.oddok.server.domain.studyroom.entity.StudyRoomHashtag;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface StudyRoomHashtagMapper {
    @Mapping(source = "hashtag.name", target = "hashtag")
    StudyRoomHashtagDto toDto(StudyRoomHashtag entity);
}
