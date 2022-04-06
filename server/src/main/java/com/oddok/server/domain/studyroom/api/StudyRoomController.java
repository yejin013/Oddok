package com.oddok.server.domain.studyroom.api;

import com.oddok.server.domain.studyroom.api.request.CheckPasswordRequest;
import com.oddok.server.domain.studyroom.api.request.CreateStudyRoomRequest;
import com.oddok.server.domain.studyroom.api.request.UpdateStudyRoomRequest;
import com.oddok.server.domain.studyroom.api.response.*;
import com.oddok.server.domain.studyroom.application.SessionService;
import com.oddok.server.domain.studyroom.application.StudyRoomService;
import com.oddok.server.domain.studyroom.dto.StudyRoomDto;
import com.oddok.server.domain.studyroom.mapper.*;
import com.oddok.server.domain.user.application.UserService;
import lombok.RequiredArgsConstructor;
import org.mapstruct.factory.Mappers;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.SortDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;

import javax.validation.Valid;

@RestController
@RequestMapping("/study-room")
@RequiredArgsConstructor
public class StudyRoomController {

    private final SessionService sessionService;
    private final StudyRoomService studyRoomService;
    private final UserService userService;

    private final StudyRoomDtoMapper dtoMapper = Mappers.getMapper(StudyRoomDtoMapper.class);


    /**
     * [GET] /study-room/user-create : 회원 생성 이후 삭제할 API
     */
    @GetMapping(value = "/user-create")
    public String createBasic() {
        return userService.createUser().toString();
    }

    /**
     * [POST] /study-room : 방생성 API (session)
     *
     * @return CreateStudyRoomResponse: 생성된 방 정보
     */
    @PostMapping
    public ResponseEntity<CreateStudyRoomResponse> create(@RequestHeader String userId, @RequestBody @Valid CreateStudyRoomRequest createStudyRoomRequest) throws OpenViduJavaClientException, OpenViduHttpException {
        // 1. OpenVidu 에 새로운 세션을 생성
        String sessionId = sessionService.createSession();
        StudyRoomDto requestDto = dtoMapper.fromCreateRequest(createStudyRoomRequest, userId, sessionId);

        // 2. StudyRoom 생성
        Long studyRoomId = studyRoomService.createStudyRoom(requestDto);
        return ResponseEntity.ok(new CreateStudyRoomResponse(studyRoomId));
    }

    /**
     * [PUT] /study-room : 방 정보 수정 API
     *
     * @return 수정된 방 정보
     */
    @PutMapping("/{id}")
    public ResponseEntity<UpdateStudyRoomResponse> update(@PathVariable Long id, @RequestHeader String userId, @RequestBody @Valid UpdateStudyRoomRequest updateStudyRoomRequest) {
        StudyRoomDto requestDto = dtoMapper.fromUpdateRequest(updateStudyRoomRequest,Long.parseLong(userId));
        StudyRoomDto studyRoomDto = studyRoomService.updateStudyRoom(id, requestDto);
        return ResponseEntity.ok(dtoMapper.toUpdateResponse(studyRoomDto));
    }

    /**
     * [Get] /study-room/join/:id : 방참여 API, 토큰 반환
     *
     * @param id Long
     * @return token
     */
    @GetMapping(value = "/join/{id}")
    public ResponseEntity<TokenResponse> join(@PathVariable Long id, @RequestHeader String userId) {
        System.out.println("💘 " + userId + "님이 {" + id + "}방에 입장하셨습니다.");
        // 1. StudyRoom id 로 세션 id 가져오기
        StudyRoomDto studyRoomDto = studyRoomService.loadStudyRoom(id);

        // 2. OpenVidu Connection 생성 및 토큰 가져오기
        String token = sessionService.getToken(studyRoomDto.getSessionId());
        TokenResponse tokenResponse = new TokenResponse(token);

        // 3. Participant 정보 저장
        studyRoomService.createParticipant(id, Long.parseLong(userId));

        return ResponseEntity.ok(tokenResponse);
    }

    /**
     * [GET] /study-room
     *
     * @param pageable
     * @return
     */
    @GetMapping
    public ResponseEntity<Page<GetStudyRoomListEntityResponse>> get(@PageableDefault(size = 16) Pageable pageable,
                                                                    @RequestParam(required = false) String category,
                                                                    @RequestParam(required = false) Boolean isPublic) {
        Page<GetStudyRoomListEntityResponse> studyRoomDtos = studyRoomService.getStudyRooms(pageable, category, isPublic).map(dtoMapper::toGetResponseList);
        return ResponseEntity.ok(studyRoomDtos);
    }

    /**
     * [GET] /study-room/:id : 방 상세 조회 API
     *
     * @param id : 방 식별자
     * @return GetStudyRoomResponse : 방 정보
     */
    @GetMapping(value = "/{id}")
    public ResponseEntity<GetStudyRoomResponse> get(@PathVariable Long id) {
        StudyRoomDto studyRoomDto = studyRoomService.loadStudyRoom(id);
        return ResponseEntity.ok(dtoMapper.toGetResponse(studyRoomDto));
    }

    /**
     * [POST] /check/{study-room-id} : 스터디방 입장 비밀번호 확인
     *
     * @param id                   : 방 식별자
     * @param checkPasswordRequest : 비밀번호
     */
    @PostMapping("/check/{id}")
    public void checkPassword(@PathVariable Long id, @RequestBody @Valid CheckPasswordRequest checkPasswordRequest) {
        studyRoomService.checkPassword(id, checkPasswordRequest.getPassword());
    }

    /**
     * [DELETE] /study-room/{study-room-id} : 스터디방 삭제
     *
     * @param id        : 방 식별자
     * @param userId    : 유저
     * @return
     */
    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id, @RequestHeader String userId) {
        studyRoomService.deleteStudyRoom(id, Long.parseLong(userId));
        return ResponseEntity.noContent().build();
    }
}