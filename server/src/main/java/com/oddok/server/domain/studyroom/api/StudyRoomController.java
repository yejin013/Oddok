package com.oddok.server.domain.studyroom.api;

import com.oddok.server.domain.studyroom.api.request.CreateStudyRoomRequest;
import com.oddok.server.domain.studyroom.api.response.CreateStudyRoomResponse;
import com.oddok.server.domain.studyroom.application.SessionService;
import com.oddok.server.domain.studyroom.application.StudyRoomService;
import com.oddok.server.domain.studyroom.dao.StudyRoomRepository;
import com.oddok.server.domain.studyroom.entity.StudyRoom;
import com.oddok.server.domain.user.dao.UserRepository;
import com.oddok.server.domain.user.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.Session;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/study-room")
@Slf4j
public class SessionController {

    @Autowired
    SessionService sessionService;
    @Autowired
    StudyRoomService studyRoomService;

    /* 로그인 구현 후 삭제할 코드 */
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private StudyRoomRepository studyRoomRepository;

    @GetMapping(value = "/create")
    public void createBasic() {
        User maker1 = new User("maker@kakao.com");

        userRepository.save(maker1);
        userRepository.save(new User("user1@kakao.com"));
        userRepository.save(new User("user2@kakao.com"));
    }
    /* end */

    /**
     * [POST] /study-room : 방생성 API (session)
     * @return
     */
    @GetMapping(value = "/create")
    public ResponseEntity<CreateStudyRoomResponse> create(@Valid @RequestBody CreateStudyRoomRequest createSessionRequest) throws OpenViduJavaClientException, OpenViduHttpException {
        System.out.println("💘 방생성: " + createSessionRequest.getName());
        String sessionId = sessionService.createSession(); // 1. OpenVidu 에 새로운 세션을 생성
        CreateStudyRoomResponse createStudyRoomResponse = studyRoomService.createStudyRoom(createSessionRequest,sessionId); // 2. StudyRoom 생성
        return ResponseEntity.ok(createStudyRoomResponse);
    }

}