package com.oddok.server.domain.studyroom.application;

import com.oddok.server.common.errors.StudyRoomNotFoundException;
import com.oddok.server.common.errors.UserNotFoundException;
import com.oddok.server.domain.studyroom.dao.ParticipantRepository;
import com.oddok.server.domain.studyroom.dao.StudyRoomRepository;
import com.oddok.server.domain.studyroom.dto.IdClassForParticipantDto;
import com.oddok.server.domain.studyroom.dto.StudyRoomDto;
import com.oddok.server.domain.studyroom.entity.Participant;
import com.oddok.server.domain.studyroom.entity.StudyRoom;
import com.oddok.server.domain.studyroom.mapper.StudyRoomMapper;
import com.oddok.server.domain.user.dao.UserRepository;

import com.oddok.server.domain.user.entity.User;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Service;

@Service
public class StudyRoomService {

    private UserRepository userRepository;
    private StudyRoomRepository studyRoomRepository;
    private ParticipantRepository participantRepository;

    private StudyRoomMapper studyRoomMapper = Mappers.getMapper(StudyRoomMapper.class);

    public StudyRoomService(UserRepository userRepository, StudyRoomRepository studyRoomRepository, ParticipantRepository participantRepository) {
        this.userRepository = userRepository;
        this.studyRoomRepository = studyRoomRepository;
        this.participantRepository = participantRepository;
    }

    public Long createStudyRoom(StudyRoomDto studyRoomDto) {
        User user = findUser(studyRoomDto.getUserId());
        StudyRoom studyRoom = StudyRoom.builder()
                .name(studyRoomDto.getName())
                .user(user)
                .sessionId(studyRoomDto.getSessionId())
                .build();
        return studyRoomRepository.save(studyRoom).getId();
    }

    public StudyRoomDto loadStudyRoom(Long id) {
        StudyRoom studyRoom = studyRoomRepository.findById(id)
                .orElseThrow(() -> new StudyRoomNotFoundException(id));
        return studyRoomMapper.toDto(studyRoom);
    }

    public User findUser(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException());
    }

    public void createParticipant(IdClassForParticipantDto idClassForParticipantDto) {
        User user = findUser(Long.parseLong(idClassForParticipantDto.getUserId()));
        Participant participant = Participant.builder()
                .studyRoomId(idClassForParticipantDto.getStudyRoomId())
                .user(user)
                .build();
        participantRepository.save(participant);
    }
}
