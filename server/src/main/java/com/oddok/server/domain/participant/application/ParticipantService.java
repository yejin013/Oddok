package com.oddok.server.domain.participant.application;

import com.oddok.server.common.errors.UserNotParticipatingException;
import com.oddok.server.domain.participant.dao.ParticipantRepository;
import com.oddok.server.domain.participant.dto.ParticipantDto;
import com.oddok.server.domain.participant.entity.Participant;
import com.oddok.server.domain.participant.mapper.ParticipantMapper;
import com.oddok.server.domain.studyroom.entity.StudyRoom;
import com.oddok.server.domain.user.application.UserService;
import com.oddok.server.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ParticipantService {

    private final UserService userService;

    private final ParticipantRepository participantRepository;

    private final ParticipantMapper participantMapper = Mappers.getMapper(ParticipantMapper.class);

    public ParticipantDto create(StudyRoom studyRoom, User user) {
        // 참가자 정보 저장
        Participant participant = Participant.builder()
                .studyRoom(studyRoom)
                .user(user)
                .build();
        // 현재 사용자 수 증가
        studyRoom.increaseCurrentUsers();
        return participantMapper.toDto(participantRepository.save(participant));
    }

    public List<ParticipantDto> get(StudyRoom studyRoom) {
        List<Participant> participant = participantRepository.findTop5ByStudyRoomOrderByJoinTimeAsc(studyRoom);
        return participantMapper.toDto(participant);
    }

    public void delete(Long userId, StudyRoom studyRoom) {
        User user = userService.findUser(userId);
        Participant participant = participantRepository.findByUser(user).orElseThrow(() -> new UserNotParticipatingException(userId, studyRoom.getId()));
        if (!participant.getStudyRoom().equals(studyRoom)) throw new UserNotParticipatingException(userId, studyRoom.getId());
        participantRepository.delete(participant);
    }
}
