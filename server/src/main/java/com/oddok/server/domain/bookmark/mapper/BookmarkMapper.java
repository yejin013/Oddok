package com.oddok.server.domain.bookmark.mapper;

import com.oddok.server.domain.bookmark.dto.BookmarkDto;
import com.oddok.server.domain.participant.dto.ParticipantDto;
import com.oddok.server.domain.studyroom.entity.StudyRoom;
import com.oddok.server.domain.studyroom.entity.StudyRoomHashtag;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface BookmarkMapper {

    @Mapping(target = "hashtags", expression = "java(hashtagToString(studyRoom.getHashtags()))")
    BookmarkDto toDto(StudyRoom studyRoom, List<ParticipantDto> participant);

    default Set<String> hashtagToString(Set<StudyRoomHashtag> hashtags) {
        return hashtags.stream().map((hashtag) -> hashtag.getHashtag().getName()).collect(Collectors.toSet());
    }
}
