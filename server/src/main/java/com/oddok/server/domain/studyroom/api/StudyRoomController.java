package com.oddok.server.domain.studyroom.api;

import com.oddok.server.domain.studyroom.api.request.CreateStudyRoomRequest;
import com.oddok.server.domain.studyroom.api.response.CreateStudyRoomResponse;
import com.oddok.server.domain.studyroom.api.response.TokenResponse;
import com.oddok.server.domain.studyroom.application.SessionService;
import com.oddok.server.domain.studyroom.application.StudyRoomService;
import com.oddok.server.domain.studyroom.dto.StudyRoomDto;
import com.oddok.server.domain.user.application.UserService;
import com.oddok.server.domain.user.dto.UserDto;
import io.openvidu.java.client.OpenViduRole;
import jdk.nashorn.internal.parser.Token;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;

import javax.validation.Valid;

@RestController
@RequestMapping("/study-room")
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
    @PostMapping
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
        Long id = studyRoomService.createStudyRoom(requestDto);
        CreateStudyRoomResponse createStudyRoomResponse = CreateStudyRoomResponse.builder().id(id).build();
        return ResponseEntity.ok(createStudyRoomResponse);
    }

    /**
     * [Get] /study-room/join/:id : 방참여 API, 토큰 반환
     * @param id
     * @return token
     */
    @GetMapping(value = "/join/{id}")
    public ResponseEntity<TokenResponse> join(@PathVariable Long id, @RequestHeader String userId) throws OpenViduJavaClientException, OpenViduHttpException {
        System.out.println("💘 " + userId + "님이 {" + id + "}방에 입장하셨습니다.");
        // 1. StudyRoom id 로 세션 id 가져오기
        StudyRoomDto studyRoom = studyRoomService.loadStudyRoom(id);

        //2. OpenVidu Connection 생성 및 토큰 가져오기
        OpenViduRole openViduRole;
        if (studyRoom.getUser().getId() == Long.parseLong(userId)) { // 방장
            openViduRole = OpenViduRole.PUBLISHER;
        } else { // 참가자
            openViduRole = OpenViduRole.SUBSCRIBER;
        }
        String token = sessionService.getToken(studyRoom.getSessionId(),openViduRole);
        TokenResponse tokenResponse = TokenResponse.builder().token(token).build();

        //TODO: 3. Participant 정보 저장
        //studyRoomService.createParticipant(id, user);
        return ResponseEntity.ok(tokenResponse);
    }

}