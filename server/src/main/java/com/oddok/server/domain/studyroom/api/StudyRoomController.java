package com.oddok.server.domain.studyroom.api;

import com.oddok.server.domain.studyroom.api.request.CreateStudyRoomRequest;
import com.oddok.server.domain.studyroom.api.response.CreateStudyRoomResponse;
import com.oddok.server.domain.studyroom.application.SessionService;
import com.oddok.server.domain.studyroom.application.StudyRoomService;
import com.oddok.server.domain.studyroom.dto.StudyRoomDto;
import com.oddok.server.domain.user.application.UserService;
import com.oddok.server.domain.user.dto.UserDto;
import io.openvidu.java.client.OpenViduRole;
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

    /**
     * [GET] /study-room/user-create : 회원 생성 이후 삭제할 API
     *
     * @return
     */
    @GetMapping(value = "/user-create")
    public String createBasic() {
        return userService.createUser().toString();
    }

    /**
     * [POST] /study-room : 방생성 API (session)
     * @return CreateStudyRoomResponse: 생성된 방 정보
     */
    @PostMapping()
    public ResponseEntity<CreateStudyRoomResponse> create(@RequestHeader String userId, @RequestBody @Valid CreateStudyRoomRequest createStudyRoomRequest) throws OpenViduJavaClientException, OpenViduHttpException {
        System.out.println("💘 방생성 요청 : " + createStudyRoomRequest.getName());
        // 1. OpenVidu 에 새로운 세션을 생성
        String sessionId = sessionService.createSession();
        UserDto userDto = userService.loadUser(Long.parseLong(userId));
        StudyRoomDto requestDto = StudyRoomDto.builder()
                .name(createStudyRoomRequest.getName())
                .user(userDto)
                .sessionId(sessionId)
                .build();
        // 2. StudyRoom 생성
        StudyRoomDto studyRoomDto = studyRoomService.createStudyRoom(requestDto);
        CreateStudyRoomResponse createStudyRoomResponse = new CreateStudyRoomResponse(studyRoomDto.getId(), studyRoomDto.getSessionId());
        return ResponseEntity.ok(createStudyRoomResponse);
    }

    /**
     * [POST] /study-room/{study-room-name} : 방참여 API, 토큰 반환
     * @param id
     * @return token
     */
    @PostMapping(value = "/join/{id}")
    public ResponseEntity join(@PathVariable Long id, @RequestHeader String userId) throws OpenViduJavaClientException, OpenViduHttpException {
        System.out.println("💘 " + userId + "님이 {" + id + "}방에 입장하셨습니다.");
        // 1. StudyRoom id 로 세션 id 가져오기
        StudyRoomDto studyRoom = studyRoomService.getById(id);

        //2. OpenVidu Connection 생성 및 토큰 가져오기
        String token = "";
        if (studyRoom.getUser().getId() == Long.parseLong(userId)) {
            token = sessionService.getToken(studyRoom.getSessionId(),OpenViduRole.PUBLISHER);
        } else {
            token = sessionService.getToken(studyRoom.getSessionId(),OpenViduRole.SUBSCRIBER);
        }

        //TODO: 3. Participant 정보 저장
        //studyRoomService.createParticipant(id, user);
        return ResponseEntity.ok(token);
    }

}