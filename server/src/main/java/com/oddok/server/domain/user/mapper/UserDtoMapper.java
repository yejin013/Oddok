package com.oddok.server.domain.user.mapper;

import com.oddok.server.domain.studyroom.dto.StudyRoomDto;
import com.oddok.server.domain.user.api.response.*;
import com.oddok.server.domain.user.dto.UserDto;
import org.mapstruct.Mapper;

@Mapper
public interface UserDtoMapper {

    ChangeNicknameResponse toChangeNicknameResponse(UserDto dto);

    GetUserResponse toUserResponse(UserDto dto);

    GetNicknameResponse toGetNicknameResponse(UserDto dto);

    GetMyStudyRoomResponse toGetMyStudyRoomResponse(StudyRoomDto dto);
}
