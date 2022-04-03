package com.oddok.server.domain.studyroom.application;

import com.oddok.server.common.errors.*;
import com.oddok.server.domain.studyroom.api.request.UpdateStudyRoomRequest;
import com.oddok.server.domain.studyroom.dao.HashtagRepository;
import com.oddok.server.domain.studyroom.dao.StudyRoomHashtagRepository;
import com.oddok.server.domain.studyroom.dao.StudyRoomRepository;
import com.oddok.server.domain.studyroom.dto.CheckPasswordDto;
import com.oddok.server.domain.studyroom.dto.StudyRoomDto;
import com.oddok.server.domain.studyroom.dao.ParticipantRepository;
import com.oddok.server.domain.studyroom.dto.IdClassForParticipantDto;
import com.oddok.server.domain.studyroom.entity.Hashtag;
import com.oddok.server.domain.studyroom.entity.Participant;
import com.oddok.server.domain.studyroom.entity.StudyRoom;
import com.oddok.server.domain.studyroom.entity.StudyRoomHashtag;
import com.oddok.server.domain.studyroom.mapper.StudyRoomMapper;
import com.oddok.server.domain.user.dao.UserRepository;

import com.oddok.server.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class StudyRoomService {

    private final UserRepository userRepository;
    private final StudyRoomRepository studyRoomRepository;
    private final ParticipantRepository participantRepository;
    private final StudyRoomHashtagRepository studyRoomHashtagRepository;
    private final HashtagRepository hashtagRepository;

    private final StudyRoomMapper studyRoomMapper = Mappers.getMapper(StudyRoomMapper.class);


    /*
    public StudyRoomService(UserRepository userRepository, StudyRoomRepository studyRoomRepository, ParticipantRepository participantRepository) {
        this.userRepository = userRepository;
        this.studyRoomRepository = studyRoomRepository;
        this.participantRepository = participantRepository;
        this.studyRoomMapper = Mappers.getMapper(StudyRoomMapper.class);
    }
     */

    @Transactional
    public Long createStudyRoom(StudyRoomDto studyRoomDto) {
        User user = findUser(studyRoomDto.getUserId());
        StudyRoom studyRoom = studyRoomMapper.toEntity(studyRoomDto, user);
//        StudyRoom studyRoom = StudyRoom.builder()
//                .name(studyRoomDto.getName())
//                .user(user)
//                .sessionId(studyRoomDto.getSessionId())
//                .isPublic(studyRoomDto.getIsPublic())
//                .password(studyRoomDto.getPassword())
//                .build();
        return studyRoomRepository.save(studyRoom).getId();
    }


    public StudyRoomDto loadStudyRoom(Long id) {
        StudyRoom studyRoom = studyRoomRepository.findById(id)
                .orElseThrow(() -> new StudyRoomNotFoundException(id));
        return studyRoomMapper.toDto(studyRoom);
    }


    public StudyRoomDto updateStudyRoom(Long id, StudyRoomDto studyRoomDto) {
        StudyRoom studyRoom = studyRoomRepository.findById(id).orElseThrow(() -> new StudyRoomNotFoundException(id));

        if (!checkPublisher(studyRoom.getUser(), studyRoomDto.getUserId())) throw new UserNotPublisherException();

        studyRoom.update(
                studyRoomDto
        );

        return studyRoomMapper.toDto(studyRoomRepository.save(studyRoom));
    }

    public StudyRoom findStudyRoom(Long id) {
        return studyRoomRepository.findById(id)
                .orElseThrow(() -> new StudyRoomNotFoundException(id));
    }

    public Boolean checkPublisher(User publisher, Long userId) {
        return publisher.getId().equals(userId);
    }

    public User findUser(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));
    }

    public void createParticipant(Long id, Long userId) {
        User user = findUser(userId);
        StudyRoom studyRoom = findStudyRoom(id);

        Participant participant = Participant.builder()
                .studyRoom(studyRoom)
                .user(user)
                .build();
        participantRepository.save(participant);
    }

    public void checkPassword(Long id, String password) {
        StudyRoom studyRoom = findStudyRoom(id);

        if (studyRoom.getIsPublic())
            throw new WrongApproachException();
        if (!studyRoom.getPassword().equals(password))
            throw new PasswordsNotMatchException();
    }
}
