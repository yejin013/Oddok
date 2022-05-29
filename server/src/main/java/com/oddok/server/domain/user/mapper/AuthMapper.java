package com.oddok.server.domain.user.mapper;

import com.oddok.server.domain.user.api.response.AuthResponse;
import com.oddok.server.domain.user.api.response.UpdateTokenResponse;
import com.oddok.server.domain.user.dto.TokenDto;
import com.oddok.server.domain.user.dto.TokensDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface AuthMapper {
    AuthResponse toAuthResponse(TokensDto dto);
    UpdateTokenResponse toTokenResponse(TokenDto dto);
}
