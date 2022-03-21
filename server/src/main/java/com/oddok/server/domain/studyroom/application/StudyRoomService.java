package com.oddok.server.domain.studyroom.application;

import com.oddok.server.common.errors.StudyRoomNotFoundException;
import com.oddok.server.common.errors.UserNotFoundException;
import com.oddok.server.domain.studyroom.api.request.CreateStudyRoomRequest;
import com.oddok.server.domain.studyroom.api.response.CreateStudyRoomResponse;
import com.oddok.server.domain.studyroom.dao.StudyRoomRepository;
import com.oddok.server.domain.studyroom.dto.StudyRoomDto;
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

    public Long createStudyRoom(StudyRoomDto studyRoomDto) {
        User user = findUser(studyRoomDto.getUser().getId());
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
        return studyRoom.toStudyRoomDto();
    }

    public User findUser(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException());
    }
}
