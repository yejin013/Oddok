package com.oddok.server.domain.studyroom.api;

import com.oddok.server.domain.studyroom.api.request.CreateStudyRoomRequest;
import com.oddok.server.domain.studyroom.api.request.UpdateStudyRoomRequest;
import com.oddok.server.domain.studyroom.api.response.CreateStudyRoomResponse;
import com.oddok.server.domain.studyroom.api.response.TokenResponse;
import com.oddok.server.domain.studyroom.application.SessionService;
import com.oddok.server.domain.studyroom.application.StudyRoomService;
import com.oddok.server.domain.studyroom.dto.IdClassForParticipantDto;
import com.oddok.server.domain.studyroom.dto.StudyRoomDto;
import com.oddok.server.domain.user.application.UserService;
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
        // 1. OpenVidu 에 새로운 세션을 생성
        String sessionId = sessionService.createSession();
        StudyRoomDto requestDto = StudyRoomDto.builder()
                .name(createStudyRoomRequest.getName())
                .userId(Long.parseLong(userId))
                .sessionId(sessionId)
                .build();
        // 2. StudyRoom 생성
        Long studyRoomId = studyRoomService.createStudyRoom(requestDto);
        CreateStudyRoomResponse createStudyRoomResponse = CreateStudyRoomResponse.builder().id(studyRoomId).build();
        return ResponseEntity.ok(createStudyRoomResponse);
    }

    /**
     * [PUT] /study-room : 방 정보 수정 API
     * @return
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable String id, @RequestHeader String userId, @RequestBody @Valid UpdateStudyRoomRequest updateStudyRoomRequest) {
        studyRoomService.updateStudyRoom(id, Long.parseLong(userId), updateStudyRoomRequest);

        return ResponseEntity.noContent().build();
    }

    /**
     * [Get] /study-room/join/:id : 방참여 API, 토큰 반환
     * @param id
     * @return token
     */
    @GetMapping(value = "/join/{id}")
    public ResponseEntity<TokenResponse> join(@PathVariable Long id, @RequestHeader String userId) {
        System.out.println("💘 " + userId + "님이 {" + id + "}방에 입장하셨습니다.");
        // 1. StudyRoom id 로 세션 id 가져오기
        StudyRoomDto studyRoomDto = studyRoomService.loadStudyRoom(id);

        // 2. OpenVidu Connection 생성 및 토큰 가져오기
        String token = sessionService.getToken(studyRoomDto.getSessionId());
        TokenResponse tokenResponse = TokenResponse.builder().token(token).build();

        // 3. Participant 정보 저장
        IdClassForParticipantDto requestDto = IdClassForParticipantDto.builder()
                .studyRoomId(id)
                .userId(userId)
                .build();
        studyRoomService.createParticipant(requestDto);

        return ResponseEntity.ok(tokenResponse);
    }

}