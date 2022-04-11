package com.oddok.server.domain.participant.mapper;

import com.oddok.server.domain.participant.dto.ParticipantDto;
import com.oddok.server.domain.participant.entity.Participant;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ParticipantMapper {
    @Mapping(source = "user.nickname", target = "nickname")
    ParticipantDto toDto(Participant participant);
    List<ParticipantDto> toDto(List<Participant> participant);
}
