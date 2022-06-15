package com.oddok.server.domain.user.mapper;

import com.oddok.server.domain.user.api.response.ChangeNicknameResponse;
import com.oddok.server.domain.user.api.response.GetNicknameResponse;
import com.oddok.server.domain.user.api.response.GetUserResponse;
import com.oddok.server.domain.user.api.response.UpdateTokenResponse;
import com.oddok.server.domain.user.dto.TokenDto;
import com.oddok.server.domain.user.dto.UserDto;
import org.mapstruct.Mapper;

@Mapper
public interface UserDtoMapper {

    ChangeNicknameResponse toChangeNicknameResponse(UserDto dto);

    GetUserResponse toUserResponse(UserDto dto);

    GetNicknameResponse toGetNicknameResponse(UserDto dto);
}
