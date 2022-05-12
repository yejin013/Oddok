package com.oddok.server.domain.profile.mapper;

import com.oddok.server.domain.profile.api.request.CreateProfileRequest;
import com.oddok.server.domain.profile.api.request.UpdateProfileRequest;
import com.oddok.server.domain.profile.api.response.CreateProfileResponse;
import com.oddok.server.domain.profile.api.response.GetProfileResponse;
import com.oddok.server.domain.profile.api.response.UpdateProfileResponse;
import com.oddok.server.domain.profile.dto.ProfileDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface ProfileDtoMapper {

    @Mapping(source = "userId", target = "userId")
    ProfileDto fromCreateRequest(CreateProfileRequest request, Long userId);

    @Mapping(source = "userId", target = "userId")
    ProfileDto fromUpdateRequest(UpdateProfileRequest request, Long userId);

    CreateProfileResponse toCreateResponse(ProfileDto request);

    GetProfileResponse toGetResponse(ProfileDto request);

    UpdateProfileResponse toUpdateResponse(ProfileDto request);

}
