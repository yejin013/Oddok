package com.oddok.server.domain.studyroom.api;

import com.oddok.server.domain.studyroom.api.request.CheckPasswordRequest;
import com.oddok.server.domain.studyroom.api.request.CreateStudyRoomRequest;
import com.oddok.server.domain.studyroom.api.request.UpdateStudyRoomRequest;
import com.oddok.server.domain.studyroom.api.response.*;
import com.oddok.server.domain.studyroom.application.StudyRoomSearchService;
import com.oddok.server.domain.studyroom.application.StudyRoomService;
import com.oddok.server.domain.studyroom.dto.StudyRoomDto;
import com.oddok.server.domain.studyroom.mapper.*;
import com.oddok.server.domain.user.application.UserService;
import lombok.RequiredArgsConstructor;
import org.mapstruct.factory.Mappers;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/study-room")
@RequiredArgsConstructor
public class StudyRoomController {

    private final StudyRoomService studyRoomService;
    private final UserService userService;
    private final StudyRoomSearchService studyRoomSearchService;

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
        StudyRoomDto requestDto = dtoMapper.fromUpdateRequest(updateStudyRoomRequest,Long.parseLong(userId),id);
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
        System.out.println("💘 " + userId + "님이 {" + id + "}방에 입장하셨습니다.");
        String token = studyRoomService.userJoinStudyRoom(Long.parseLong(userId), id);
        TokenResponse tokenResponse = new TokenResponse(token);
        return ResponseEntity.ok(tokenResponse);
    }

    /**
     * [GET] /study-room
     *
     * @param category : 카테고리
     * @param isPublic : 공개방 유무
     * @param pageable
     * @return
     */
    @GetMapping
    public ResponseEntity<Page<GetStudyRoomListEntityResponse>> get(@PageableDefault(size = 16) Pageable pageable,
                                                                    @RequestParam(required = false) String category,
                                                                    @RequestParam(required = false) Boolean isPublic) {
        if(isPublic == null) isPublic = false;
        Page<GetStudyRoomListEntityResponse> studyRoomResponse;
        if(category == null)
            studyRoomResponse = studyRoomSearchService.getStudyRooms(pageable, isPublic).map(dtoMapper::toGetResponseList);
        else
            studyRoomResponse = studyRoomSearchService.getStudyRoomsByCategory(pageable, isPublic, category).map(dtoMapper::toGetResponseList);
        return ResponseEntity.ok(studyRoomResponse);
    }

    /**
     * [GET] /study-room/search
     *
     * @param isPublic : 공개방 유무
     * @param name : 스터디방 이름
     * @param pageable
     * @return
     */
    @GetMapping("/search")
    public ResponseEntity<Page<GetStudyRoomListEntityResponse>> get(@PageableDefault(size = 16) Pageable pageable,
                                                                    @RequestParam(required = false) Boolean isPublic,
                                                                    @RequestParam(required = false) String name,
                                                                    @RequestParam(required = false) String hashtag) {
        if(isPublic == null) isPublic = false;
        Page<GetStudyRoomListEntityResponse> studyRoomResponse;
        if(name == null)
            studyRoomResponse = studyRoomSearchService.getStudyRooms(pageable, isPublic).map(dtoMapper::toGetResponseList);
        else
            studyRoomResponse = studyRoomSearchService.getStudyRoomsByName(pageable, isPublic, name).map(dtoMapper::toGetResponseList);
        return ResponseEntity.ok(studyRoomResponse);
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
        studyRoomService.checkPublisher(id, Long.parseLong(userId));
        studyRoomService.deleteStudyRoom(id);
        return ResponseEntity.noContent().build();
    }
}