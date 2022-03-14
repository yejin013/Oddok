package com.oddok.server.domain.studyroom.api;

import com.oddok.server.domain.studyroom.api.request.CreateStudyRoomRequest;
import com.oddok.server.domain.studyroom.api.response.CreateStudyRoomResponse;
import com.oddok.server.domain.studyroom.application.SessionService;
import com.oddok.server.domain.studyroom.application.StudyRoomService;
import com.oddok.server.domain.user.application.UserService;
import io.openvidu.java.client.Session;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/study-room")
public class StudyRoomController {

    private SessionService sessionService;
    private StudyRoomService studyRoomService;
    private UserService userService;

    public StudyRoomController(SessionService sessionService, StudyRoomService studyRoomService, UserService userService) {
        this.sessionService = sessionService;
        this.studyRoomService = studyRoomService;
        this.userService = userService;
    }

    @GetMapping(value = "/user-create")
    public String createBasic() {
        return userService.createUser().toString();
    }
    /* end */

    /**
     * [POST] /study-room : 방생성 API (session)
     * @return
     */
    @PostMapping()
    public ResponseEntity<CreateStudyRoomResponse> create(@RequestBody @Valid CreateStudyRoomRequest createSessionRequest) throws OpenViduJavaClientException, OpenViduHttpException {
        System.out.println("💘 방생성 요청 : " + createSessionRequest.getName());
        String sessionId = sessionService.createSession(); // 1. OpenVidu 에 새로운 세션을 생성
        CreateStudyRoomResponse createStudyRoomResponse = studyRoomService.createStudyRoom(createSessionRequest,sessionId); // 2. StudyRoom 생성
        return ResponseEntity.ok(createStudyRoomResponse);
    }

    /**
     * [POST] /study-room/{study-room-name} : 방참여 API, 토큰 반환
     * @param id
     * @return
     */
    @PostMapping(value = "/{id}")
    public ResponseEntity join(@PathVariable String id, @RequestBody String user) {

        System.out.println("💘 "+user+"님이 {"+id+"}방에 입장하셨습니다.");

        /**
         * 1. 세션 가져오기
         * 2. OpenVidu Connection 생성 및 토큰 가져오기
         * 3. DB에서 Participant 에 참여자 정보 저장

        // 1. 세션 가져오기
        Session session = studyRoomService.getSession(id);

        //2. OpenVidu Connection 생성 및 토큰 가져오기
        String token = studyRoomService.getToken(session, id);

        //3. Participant 정보 저장 (나중에는 id로 수정)
        studyRoomService.createParticipant(id, user);

         */
        return ResponseEntity.ok("토큰");
    }

}