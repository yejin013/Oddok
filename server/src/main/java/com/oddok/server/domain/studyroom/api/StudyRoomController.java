package com.oddok.server.domain.studyroom.api;

import com.oddok.server.domain.studyroom.api.request.CheckPasswordRequest;
import com.oddok.server.domain.studyroom.api.request.CreateStudyRoomRequest;
import com.oddok.server.domain.studyroom.api.request.UpdateStudyRoomRequest;
import com.oddok.server.domain.studyroom.api.response.*;
import com.oddok.server.domain.studyroom.application.StudyRoomInformationService;
import com.oddok.server.domain.studyroom.application.StudyRoomSearchService;
import com.oddok.server.domain.studyroom.application.StudyRoomService;
import com.oddok.server.domain.studyroom.dto.StudyRoomDto;
import com.oddok.server.domain.studyroom.mapper.*;
import com.oddok.server.domain.user.application.UserService;

import java.util.Optional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.mapstruct.factory.Mappers;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@RestController
@RequestMapping("/study-room")
@RequiredArgsConstructor
public class StudyRoomController {

    private final StudyRoomService studyRoomService;
    private final StudyRoomSearchService studyRoomSearchService;
    private final StudyRoomInformationService studyRoomInformationService;
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
    public ResponseEntity<CreateStudyRoomResponse> create(@RequestHeader String userId, @RequestBody @Valid CreateStudyRoomRequest createStudyRoomRequest) {
        StudyRoomDto requestDto = dtoMapper.fromCreateRequest(createStudyRoomRequest, userId);
        Long studyRoomId = studyRoomService.createStudyRoom(requestDto).getId();
        return ResponseEntity.ok(new CreateStudyRoomResponse(studyRoomId));
    }

    /**
     * [PUT] /study-room : 방 정보 수정 API
     *
     * @return 수정된 방 정보
     */
    @PutMapping("/{id}")
    public ResponseEntity<UpdateStudyRoomResponse> update(@PathVariable Long id, @RequestHeader String userId, @RequestBody @Valid UpdateStudyRoomRequest updateStudyRoomRequest) {
        studyRoomService.checkPublisher(id, Long.parseLong(userId));
        StudyRoomDto requestDto = dtoMapper.fromUpdateRequest(updateStudyRoomRequest, Long.parseLong(userId), id);
        StudyRoomDto studyRoomDto = studyRoomService.updateStudyRoom(requestDto);
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
        log.info("userId = {}, id = {}",userId,id);
        String token = studyRoomService.userJoinStudyRoom(Long.parseLong(userId), id);
        TokenResponse tokenResponse = new TokenResponse(token);
        return ResponseEntity.ok(tokenResponse);
    }

    /**
     * [GET] /study-room/:id : 방 상세 조회 API
     *
     * @param id : 방 식별자
     * @return GetStudyRoomResponse : 방 정보
     */
    @GetMapping(value = "/{id}")
    public ResponseEntity<GetStudyRoomResponse> getDetail(@PathVariable Long id) {
        StudyRoomDto studyRoomDto = studyRoomInformationService.loadStudyRoom(id);
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
     * 스터디룸 나가기 요청
     *
     * @param id
     * @param userId
     * @return 퇴장 알림 메세지
     */
    @GetMapping("/leave/{id}")
    public ResponseEntity leave(@PathVariable Long id, @RequestHeader String userId) {
        studyRoomService.userLeaveStudyRoom(Long.parseLong(userId), id);
        return ResponseEntity.ok(userId + "님이 " + id + "번 방에서 나갔습니다.");
    }

    /**
     * [DELETE] /study-room/{study-room-id} : 스터디방 삭제
     *
     * @param id     : 방 식별자
     * @param userId : 유저
     * @return 삭제 알림 메세지
     */
    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id, @RequestHeader String userId) {
        studyRoomService.checkPublisher(id, Long.parseLong(userId));
        studyRoomService.deleteStudyRoom(id);
        return ResponseEntity.ok("삭제되었습니다.");
    }

    /**
     * [GET] /study-room/user/:id : 특정 사용자가 개설한 스터디룸 상세 조회 API
     *
     * @param id : 사용자 식별자
     * @return GetStudyRoomResponse : 방 정보
     */
    @GetMapping(value = "/user/{id}")
    public ResponseEntity<Optional<GetStudyRoomResponse>> getUserPublishedStudyRoom(@PathVariable Long id) {
        Optional<StudyRoomDto> studyRoomDto = studyRoomInformationService.loadStudyRoomByUser(id);
        return ResponseEntity.ok(studyRoomDto.map(dtoMapper::toGetResponse));
    }
}