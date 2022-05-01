package com.oddok.server.domain.user.mapper;

import com.oddok.server.domain.user.api.request.ChangeNicknameRequest;
import com.oddok.server.domain.user.api.response.ChangeNicknameResponse;
import com.oddok.server.domain.user.dto.UserDto;

public interface UserDtoMapper {

    UserDto fromChangeNicknameRequest(ChangeNicknameRequest request);
    ChangeNicknameResponse toChangeNicknameResponse(UserDto dto);
}
