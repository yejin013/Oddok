package com.oddok.server.domain.studyroom.api;

import com.oddok.server.domain.studyroom.api.request.CheckPasswordRequest;
import com.oddok.server.domain.studyroom.api.request.CreateStudyRoomRequest;
import com.oddok.server.domain.studyroom.api.request.UpdateStudyRoomRequest;
import com.oddok.server.domain.studyroom.api.response.*;
import com.oddok.server.domain.studyroom.application.StudyRoomInformationService;
import com.oddok.server.domain.studyroom.application.StudyRoomSearchService;
import com.oddok.server.domain.studyroom.application.StudyRoomService;
import com.oddok.server.domain.studyroom.dto.StudyRoomDto;
import com.oddok.server.domain.studyroom.mapper.StudyRoomDtoMapper;
import com.oddok.server.domain.user.application.UserService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.oddok.server.domain.user.dto.TokensDto;
import com.oddok.server.domain.user.entity.Auth;
import com.oddok.server.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.mapstruct.factory.Mappers;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@Slf4j
@RestController
@RequestMapping("/study-room")
@RequiredArgsConstructor
public class StudyRoomController {

    private final StudyRoomService studyRoomService;
    private final StudyRoomInformationService studyRoomInformationService;
    private final StudyRoomSearchService studyRoomSearchService;
    private final UserService userService;

    private final StudyRoomDtoMapper studyRoomDtoMapper = Mappers.getMapper(StudyRoomDtoMapper.class);

    /**
     * [GET] /study-room/user-create : 회원 생성 이후 삭제할 API
     */
    @GetMapping(value = "/user-create")
    public String createBasic(HttpServletResponse response) {
        TokensDto tokensDto = userService.createUser();
        ResponseCookie cookie = ResponseCookie.from("refreshToken", tokensDto.getRefreshToken())
                .maxAge(1209600000)
                .path("/")
                .secure(false)
                .httpOnly(true)
                .build();
        response.setHeader("Set-Cookie", cookie.toString());
        return tokensDto.getAccessToken();
    }

    /**
     * [POST] /study-room : 방생성 API (session)
     *
     * @return CreateStudyRoomResponse: 생성된 방 정보
     */
    @PostMapping
    public ResponseEntity<CreateStudyRoomResponse> create(@AuthenticationPrincipal Auth auth, @RequestBody @Valid CreateStudyRoomRequest createStudyRoomRequest) {
        StudyRoomDto requestDto = studyRoomDtoMapper.fromCreateRequest(createStudyRoomRequest);
        Long studyRoomId = studyRoomService.createStudyRoom(auth, requestDto).getId();
        return ResponseEntity.ok(new CreateStudyRoomResponse(studyRoomId));
    }

    /**
     * [PUT] /study-room : 방 정보 수정 API
     *
     * @return 수정된 방 정보
     */
    @PutMapping("/{id}")
    public ResponseEntity<UpdateStudyRoomResponse> update(@PathVariable Long id, @RequestBody @Valid UpdateStudyRoomRequest updateStudyRoomRequest) {
        StudyRoomDto requestDto = studyRoomDtoMapper.fromUpdateRequest(updateStudyRoomRequest, id);
        StudyRoomDto studyRoomDto = studyRoomService.updateStudyRoom(requestDto);
        return ResponseEntity.ok(studyRoomDtoMapper.toUpdateResponse(studyRoomDto));
    }

    /**
     * [Get] /study-room/join/:id : 방참여 API, 토큰 반환
     *
     * @param id Long
     * @return token
     */
    @GetMapping(value = "/join/{id}")
    public ResponseEntity<TokenResponse> join(@PathVariable Long id, @AuthenticationPrincipal Auth auth) {
        log.info("join userId = {}, id = {}", auth.getId(), id);
        String token = studyRoomService.userJoinStudyRoom(id, auth);
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
        return ResponseEntity.ok(studyRoomDtoMapper.toGetResponse(studyRoomDto));
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
     * @param id 나갈 스터디룸 식별자
     * @param user 요청한 사용자 식별자
     * @return 퇴장 알림 메세지
     */
    @GetMapping("/leave/{id}")
    public ResponseEntity leave(@PathVariable Long id, @AuthenticationPrincipal User user) {
        studyRoomService.userLeaveStudyRoom(id, user);
        return ResponseEntity.ok(user.getId() + "님이 " + id + "번 방에서 나갔습니다.");
    }

    /**
     * [DELETE] /study-room/{study-room-id} : 스터디방 삭제
     *
     * @param id     : 방 식별자
     * @param user : 요청한 사용자 식별자
     * @return 삭제 알림 메세지
     */
    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id, @AuthenticationPrincipal User user) {
        studyRoomService.checkPublisher(id, user);
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
        return ResponseEntity.ok(studyRoomDto.map(studyRoomDtoMapper::toGetResponse));
    }

    /**
     * [GET] /study-room : 스터디룸 리스트 조회 / 검색
     *
     * @param name     스터디룸 방 이름
     * @param hashtag 해시태그 이름
     * @param category 카테고리명
     * @param isPublic 공개방 여부
     * @param pageable 페이징
     * @return 검색 결과 스터디룸 리스트
     */
    @GetMapping
    public ResponseEntity<List<GetStudyRoomListEntityResponse>> get(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String hashtag,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Boolean isPublic,
            @PageableDefault(size = 16, sort = "createAt", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        List<StudyRoomDto> studyRooms;
        if (hashtag == null) {
            studyRooms = studyRoomSearchService.getStudyRoomsBySearchConditions(name, isPublic, category, pageable);
        } else {
            studyRooms = studyRoomSearchService.getStudyRoomsBySearchConditions(name, hashtag, isPublic, category, pageable);
        }
        return ResponseEntity.ok(studyRooms.stream().map(studyRoomDtoMapper::toGetResponseList).collect(Collectors.toList()));
    }

}