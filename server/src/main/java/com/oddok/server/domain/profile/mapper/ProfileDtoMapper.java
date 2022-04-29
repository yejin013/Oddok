package com.oddok.server.domain.profile.mapper;

import com.oddok.server.domain.profile.api.request.CreateProfileRequest;
import com.oddok.server.domain.profile.api.response.ProfileResponse;
import com.oddok.server.domain.profile.dto.ProfileDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface ProfileDtoMapper {

    @Mapping(source = "userId", target = "userId")
    ProfileDto fromCreateRequest(CreateProfileRequest request, Long userId);

    ProfileResponse toResponse(ProfileDto request);

}
