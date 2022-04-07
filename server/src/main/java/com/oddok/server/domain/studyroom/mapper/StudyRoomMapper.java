package com.oddok.server.domain.studyroom.mapper;

import com.oddok.server.domain.studyroom.dto.StudyRoomDto;
import com.oddok.server.domain.studyroom.entity.StudyRoom;
import com.oddok.server.domain.studyroom.entity.StudyRoomHashtag;
import com.oddok.server.domain.user.entity.User;
import java.util.Set;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface StudyRoomMapper {
    @Mapping(source = "user.id", target = "userId")
    @Mapping(target = "hashtags", expression = "java(hashtagToString(studyRoom.getHashtags()))")
    @Mapping(source = "category.value", target = "category")
    StudyRoomDto toDto(StudyRoom studyRoom);

    @Mapping(source = "studyRoomDto.targetTime", target = "targetTime")
    @Mapping(source = "user", target = "user")
    StudyRoom toEntity(StudyRoomDto studyRoomDto, User user);

    default Set<String> hashtagToString(Set<StudyRoomHashtag> hashtags) {
        return hashtags.stream().map((hashtag) -> hashtag.getHashtag().getName()).collect(Collectors.toSet());
    }
}
