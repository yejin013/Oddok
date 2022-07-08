package com.oddok.server.domain.user.api;

import com.oddok.server.domain.studyroom.dto.StudyRoomDto;
import com.oddok.server.domain.user.api.request.ChangeNicknameRequest;
import com.oddok.server.domain.user.api.response.ChangeNicknameResponse;
import com.oddok.server.domain.user.api.response.GetMyStudyRoomResponse;
import com.oddok.server.domain.user.api.response.GetNicknameResponse;
import com.oddok.server.domain.user.api.response.GetUserResponse;
import com.oddok.server.domain.user.application.UserService;
import com.oddok.server.domain.user.dto.UserDto;
import com.oddok.server.domain.user.entity.User;
import com.oddok.server.domain.user.mapper.UserDtoMapper;
import lombok.RequiredArgsConstructor;
import org.mapstruct.factory.Mappers;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserDtoMapper userDtoMapper = Mappers.getMapper(UserDtoMapper.class);

    @PatchMapping("/nickname")
    public ResponseEntity<ChangeNicknameResponse> changeNickname(@AuthenticationPrincipal User user,
                                                                 @RequestBody @Valid ChangeNicknameRequest changeNicknameRequest) {
        return ResponseEntity.ok(userDtoMapper.toChangeNicknameResponse(
                userService.changeNickname(user, changeNicknameRequest.getNickname())));
    }

    @GetMapping("/nickname")
    public ResponseEntity<GetNicknameResponse> getNickname(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(userDtoMapper.toGetNicknameResponse(
                userService.getUserInfo(user.getId())));
    }

    @GetMapping("/info")
    public ResponseEntity<GetUserResponse> getUser(@AuthenticationPrincipal User user) {
        UserDto userInfo = userService.getUserInfo(user.getId());
        return ResponseEntity.ok(userDtoMapper.toUserResponse(userInfo));
    }

    @GetMapping("/{id}")
    public ResponseEntity<GetUserResponse> getUserById(@PathVariable("id") Long id) {
        UserDto userInfo = userService.getUserInfo(id);
        return ResponseEntity.ok(userDtoMapper.toUserResponse(userInfo));
    }

    @GetMapping("/my-study-room")
    public ResponseEntity<Optional<GetMyStudyRoomResponse>> getMyStudyRoom(@AuthenticationPrincipal User user) {
        Optional<StudyRoomDto> myStudyRoomDto = userService.loadMyStudyRoom(user);
        return ResponseEntity.ok(myStudyRoomDto.map(userDtoMapper::toGetMyStudyRoomResponse));
    }
}
