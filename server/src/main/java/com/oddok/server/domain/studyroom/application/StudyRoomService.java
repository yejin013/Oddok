package com.oddok.server.domain.studyroom.application;

import com.oddok.server.common.errors.StudyRoomNotFoundException;
import com.oddok.server.common.errors.UserNotFoundException;
import com.oddok.server.common.utils.StringUtils;
import com.oddok.server.domain.studyroom.api.request.CreateStudyRoomRequest;
import com.oddok.server.domain.studyroom.api.request.UpdateStudyRoomRequest;
import com.oddok.server.domain.studyroom.api.response.CreateStudyRoomResponse;
import com.oddok.server.domain.studyroom.dao.StudyRoomRepository;
import com.oddok.server.domain.studyroom.dto.StudyRoomDto;
import com.oddok.server.domain.studyroom.entity.StudyRoom;
import com.oddok.server.domain.user.dao.UserRepository;

import com.oddok.server.domain.user.entity.User;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class StudyRoomService {

    private UserRepository userRepository;
    private StudyRoomRepository studyRoomRepository;

    public StudyRoomService(UserRepository userRepository, StudyRoomRepository studyRoomRepository) {
        this.userRepository = userRepository;
        this.studyRoomRepository = studyRoomRepository;
    }

    public CreateStudyRoomResponse createStudyRoom(CreateStudyRoomRequest createStudyRoomRequest, String sessionId) {
        User user = findUser(createStudyRoomRequest.getUser());
        StudyRoom studyRoom = new StudyRoom(createStudyRoomRequest.getName(), user, sessionId);
        /*
        StudyRoom studyRoom = new StudyRoom(createStudyRoomRequest.getName(), user, sessionId,
                createStudyRoomRequest.getImage(), createStudyRoomRequest.getIsPublic(),
                createStudyRoomRequest.getPassword(), createStudyRoomRequest.getTargetTime(),
                createStudyRoomRequest.getRule(), createStudyRoomRequest.getLimitUsers(),
                createStudyRoomRequest.getStartAt(), createStudyRoomRequest.getEndAt());
         */
        return studyRoomRepository.save(studyRoom).toCreateStudyRoomResponse();
    }

    public StudyRoomDto updateStudyRoom(String id, String user, UpdateStudyRoomRequest updateStudyRoomRequest) {
        StudyRoom studyRoom = studyRoomRepository.findById(Long.parseLong(id)).orElseThrow(() -> new StudyRoomNotFoundException(Long.parseLong(id)));
        if (checkPublisher(studyRoom.getUser(), user)) {
            if (StringUtils.isNotBlank(studyRoom.getName())) studyRoom.setName(studyRoom.getName());
            if (StringUtils.isNotBlank(studyRoom.getImage())) studyRoom.setImage(studyRoom.getImage());
            if (studyRoom.getIsPublic()) studyRoom.setIsPublic(studyRoom.getIsPublic());
            if (StringUtils.isNotBlank(studyRoom.getPassword())) studyRoom.setPassword(studyRoom.getPassword());
            if (studyRoom.getTargetTime() != null) studyRoom.setTargetTime(studyRoom.getTargetTime());
            if (StringUtils.isNotBlank(studyRoom.getRule())) studyRoom.setRule(studyRoom.getRule());
            if (studyRoom.getLimitUsers() != null) studyRoom.setLimitUsers(studyRoom.getLimitUsers());
            if (studyRoom.getStartAt() != null) studyRoom.setStartAt(studyRoom.getStartAt());
            if (studyRoom.getEndAt() != null) studyRoom.setEndAt(studyRoom.getEndAt());
        } else {
            throw new RuntimeException();
        }

        StudyRoom response = studyRoomRepository.save(studyRoom);


        return StudyRoomDto.builder()
                .name(response.getName())
                .build();
    }

    public Boolean checkPublisher(User publisher, String user) {
        return publisher.getId() == Long.parseLong(user);
//        return publisher.equals(user);
    }

    public User findUser(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException());
    }
}
