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

import com.oddok.server.domain.user.dto.UserDto;
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
            studyRoom.update(
                    updateStudyRoomRequest.getName()
                    /*
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
        } else {
            throw new RuntimeException();
        }

        StudyRoom response = studyRoomRepository.save(studyRoom);

        return StudyRoomDto.builder()
                .name(response.getName())
                .user(response.getUser().toUserDto())
                /*
                .image(response.getImage())
                .isPublic(response.getIsPublic())
                .password(response.getPassword())
                .targetTime(response.getTargetTime())
                .rule(response.getRule())
                .limitUsers(response.getLimitUsers())
                .startAt(response.getStartAt())
                .endAt(response.getEndAt())
                 */
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
