package com.oddok.server.domain.profile.mapper;

import com.oddok.server.domain.profile.dto.ProfileDto;
import com.oddok.server.domain.profile.entity.Profile;
import com.oddok.server.domain.user.entity.User;
import org.mapstruct.Mapper;

@Mapper
public interface ProfileMapper {

    Profile toEntity(ProfileDto request, User user);
    ProfileDto toDto(Profile request);
}
