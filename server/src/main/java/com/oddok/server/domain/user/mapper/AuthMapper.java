package com.oddok.server.domain.user.mapper;

import com.oddok.server.domain.user.api.request.AuthRequest;
import com.oddok.server.domain.user.api.response.AuthResponse;
import com.oddok.server.domain.user.dto.TokenDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface AuthMapper {

    @Mapping(source = "accessToken", target = "token")
    TokenDto fromAuthRequest(AuthRequest request);
    @Mapping(source = "token", target = "appToken")
    AuthResponse toAuthResponse(TokenDto dto);
}
