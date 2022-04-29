package com.oddok.server.domain.profile.api;

import com.oddok.server.domain.profile.api.request.CreateProfileRequest;
import com.oddok.server.domain.profile.api.response.ProfileResponse;
import com.oddok.server.domain.profile.application.ProfileService;
import com.oddok.server.domain.profile.dto.ProfileDto;
import com.oddok.server.domain.profile.mapper.ProfileDtoMapper;
import lombok.RequiredArgsConstructor;
import org.mapstruct.factory.Mappers;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    private final ProfileDtoMapper dtoMapper = Mappers.getMapper(ProfileDtoMapper.class);;

    @PostMapping
    public ResponseEntity<ProfileResponse> create(@RequestHeader String userId, @RequestBody @Valid CreateProfileRequest createProfileRequest) {
        ProfileDto profileDto = dtoMapper.fromCreateRequest(createProfileRequest, Long.parseLong(userId));
        ProfileDto response = profileService.create(profileDto);
        return ResponseEntity.ok(dtoMapper.toResponse(response));
    }
}
