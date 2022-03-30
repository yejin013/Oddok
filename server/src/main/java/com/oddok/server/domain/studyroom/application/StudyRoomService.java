package com.oddok.server.domain.studyroom.application;

import com.oddok.server.common.errors.*;
import com.oddok.server.domain.studyroom.api.request.UpdateStudyRoomRequest;
import com.oddok.server.domain.studyroom.dao.StudyRoomRepository;
import com.oddok.server.domain.studyroom.dto.CheckPasswordDto;
import com.oddok.server.domain.studyroom.dto.StudyRoomDto;
import com.oddok.server.domain.studyroom.dao.ParticipantRepository;
import com.oddok.server.domain.studyroom.dto.IdClassForParticipantDto;
import com.oddok.server.domain.studyroom.entity.Participant;
import com.oddok.server.domain.studyroom.entity.StudyRoom;
import com.oddok.server.domain.studyroom.mapper.StudyRoomMapper;
import com.oddok.server.domain.user.dao.UserRepository;

import com.oddok.server.domain.user.entity.User;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class StudyRoomService {

    private final UserRepository userRepository;
    private final StudyRoomRepository studyRoomRepository;
    private final ParticipantRepository participantRepository;

    private final StudyRoomMapper studyRoomMapper;

    public StudyRoomService(UserRepository userRepository, StudyRoomRepository studyRoomRepository, ParticipantRepository participantRepository) {
        this.userRepository = userRepository;
        this.studyRoomRepository = studyRoomRepository;
        this.participantRepository = participantRepository;
        this.studyRoomMapper = Mappers.getMapper(StudyRoomMapper.class);
    }

    public Long createStudyRoom(StudyRoomDto studyRoomDto) {
        User user = findUser(studyRoomDto.getUserId());
        StudyRoom studyRoom = StudyRoom.builder()
                .name(studyRoomDto.getName())
                .user(user)
                .sessionId(studyRoomDto.getSessionId())
                .isPublic(studyRoomDto.getIsPublic())
                .password(studyRoomDto.getPassword())
                .build();
        return studyRoomRepository.save(studyRoom).getId();
    }

    public StudyRoomDto loadStudyRoom(Long id) {
        StudyRoom studyRoom = studyRoomRepository.findById(id)
                .orElseThrow(() -> new StudyRoomNotFoundException(id));
        return studyRoomMapper.toDto(studyRoom);
    }

    public StudyRoom getStudyRoom(Long id) {
        return studyRoomRepository.findById(id)
                .orElseThrow(() -> new StudyRoomNotFoundException(id));
    }

    public StudyRoomDto updateStudyRoom(String id, Long userId, UpdateStudyRoomRequest updateStudyRoomRequest) {
        StudyRoom studyRoom = studyRoomRepository.findById(Long.parseLong(id)).orElseThrow(() -> new StudyRoomNotFoundException(Long.parseLong(id)));

        if (!checkPublisher(studyRoom.getUser(), userId)) throw new UserNotPublisherException();

        studyRoom.update(
                updateStudyRoomRequest.getName(),
                updateStudyRoomRequest.getCategory() //.
                /*
                updateStudyRoomRequest.getHashtags();
                updateStudyRoomRequest.getImage(),
                updateStudyRoomRequest.getIsPublic(),
                updateStudyRoomRequest.getPassword(),
                updateStudyRoomRequest.getTargetTime(),
                updateStudyRoomRequest.getRule(),
                updateStudyRoomRequest.getLimitUsers(),
                updateStudyRoomRequest.getStartAt(),
                updateStudyRoomRequest.getEndAt()
                 */
        );

        return studyRoomMapper.toDto(studyRoomRepository.save(studyRoom));

    }

    public Boolean checkPublisher(User publisher, Long userId) {
        return publisher.getId().equals(userId);
    }

    public User findUser(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));
    }

    public void createParticipant(IdClassForParticipantDto idClassForParticipantDto) {
        User user = findUser(Long.parseLong(idClassForParticipantDto.getUserId()));
        Participant participant = Participant.builder()
                .studyRoomId(idClassForParticipantDto.getStudyRoomId())
                .user(user)
                .build();
        participantRepository.save(participant);
    }

    public void checkPassword(CheckPasswordDto checkPasswordDto) {
        StudyRoom studyRoom = getStudyRoom(checkPasswordDto.getStudyRoomId());

        if(!studyRoom.getIsPublic())
            throw new WrongApproachException();
        if(!studyRoom.getPassword().equals(checkPasswordDto.getPassword()))
            throw new PasswordsNotMatchException();
    }
}
