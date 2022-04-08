package com.oddok.server.domain.bookmark.mapper;

import com.oddok.server.domain.bookmark.dto.BookmarkDto;
import com.oddok.server.domain.bookmark.dto.ParticipantDto;
import com.oddok.server.domain.studyroom.entity.Participant;
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
    @Mapping(target = "participant", expression = "java(participantToDto(participant))")
    BookmarkDto toDto(StudyRoom studyRoom, List<Participant> participant);

    @Mapping(source = "user.nickname", target = "nickname")
    ParticipantDto toDto(Participant participant);
    List<ParticipantDto> toDto(List<Participant> participant);

    default Set<String> hashtagToString(Set<StudyRoomHashtag> hashtags) {
        return hashtags.stream().map((hashtag) -> hashtag.getHashtag().getName()).collect(Collectors.toSet());
    }

    default List<ParticipantDto> participantToDto(List<Participant> participant) {
        return toDto(participant);
    }
}
