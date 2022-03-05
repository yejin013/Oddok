package com.oddok.server.domain.studyroom.application;

import com.oddok.server.domain.studyroom.dao.StudyRoomRepository;
import com.oddok.server.domain.studyroom.dto.CheckMasterDto;
import com.oddok.server.domain.studyroom.dto.CorrectDto;
import com.oddok.server.domain.studyroom.entity.StudyRoom;
import com.oddok.server.domain.user.dao.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SessionService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private StudyRoomRepository studyRoomRepository;

    public CorrectDto checkMaster(CheckMasterDto checkMasterDto) throws Exception {

        StudyRoom studyRoom = studyRoomRepository.findById(checkMasterDto.getStudyRoomId()).orElseThrow(Exception::new);
        if (studyRoom.getUser() == userRepository.findByEmail(checkMasterDto.getUser()).orElseThrow(Exception::new)) {
            return new CorrectDto(true);
        } return new CorrectDto(false);
    }
}
