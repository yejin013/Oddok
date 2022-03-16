package com.oddok.server.domain.studyroom.application;

import com.oddok.server.common.errors.UserNotFoundException;
import com.oddok.server.domain.studyroom.api.request.CreateStudyRoomRequest;
import com.oddok.server.domain.studyroom.api.response.CreateStudyRoomResponse;
import com.oddok.server.domain.studyroom.dao.StudyRoomRepository;
import com.oddok.server.domain.studyroom.entity.StudyRoom;
import com.oddok.server.domain.user.dao.UserRepository;

import com.oddok.server.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
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

    public User findUser(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException());
    }
}
