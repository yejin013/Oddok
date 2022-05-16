package com.oddok.server.domain.studyroom.application;

import com.oddok.server.common.errors.StudyRoomNotFoundException;
import com.oddok.server.common.errors.UserNotFoundException;
import com.oddok.server.domain.studyroom.dao.StudyRoomRepository;
import com.oddok.server.domain.studyroom.dto.StudyRoomDto;
import com.oddok.server.domain.studyroom.entity.StudyRoom;
import com.oddok.server.domain.studyroom.mapper.StudyRoomMapper;
import com.oddok.server.domain.user.dao.UserRepository;
import com.oddok.server.domain.user.entity.User;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudyRoomInformationService {

    private final UserRepository userRepository;
    private final StudyRoomRepository studyRoomRepository;

    private final StudyRoomMapper studyRoomMapper;

    public StudyRoomDto loadStudyRoom(Long id) {
        StudyRoom studyRoom = studyRoomRepository.findById(id)
            .orElseThrow(() -> new StudyRoomNotFoundException(id));
        return studyRoomMapper.toDto(studyRoom);
    }

    /**
     * 사용자가 개설한 스터디룸을 가져옵니다.
     *
     * @param userId 사용자 식별자
     * @return 개설한 스터디룸 (없을 경우 빈 객체)
     */
    public Optional<StudyRoomDto> loadStudyRoomByUser(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new UserNotFoundException(userId));
        Optional<StudyRoom> studyRoom = studyRoomRepository.findByUser(user);
        return studyRoom.map(studyRoomMapper::toDto);
    }

}
