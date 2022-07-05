package com.oddok.server.domain.profile.api;

import com.oddok.server.domain.profile.api.request.CreateProfileRequest;
import com.oddok.server.domain.profile.api.request.UpdateProfileRequest;
import com.oddok.server.domain.profile.api.response.CreateProfileResponse;
import com.oddok.server.domain.profile.api.response.GetProfileResponse;
import com.oddok.server.domain.profile.api.response.UpdateProfileResponse;
import com.oddok.server.domain.profile.application.ProfileService;
import com.oddok.server.domain.profile.dto.ProfileDto;
import com.oddok.server.domain.profile.mapper.ProfileDtoMapper;
import com.oddok.server.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.mapstruct.factory.Mappers;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    private final ProfileDtoMapper dtoMapper = Mappers.getMapper(ProfileDtoMapper.class);;

    @PostMapping
    public ResponseEntity<CreateProfileResponse> create(@AuthenticationPrincipal User user, @RequestBody @Valid CreateProfileRequest createProfileRequest) {
        ProfileDto profileDto = dtoMapper.fromCreateRequest(createProfileRequest);
        ProfileDto response = profileService.create(user, profileDto);
        return ResponseEntity.ok(dtoMapper.toCreateResponse(response));
    }

    @GetMapping
    public ResponseEntity<Optional<GetProfileResponse>> get(@AuthenticationPrincipal User user) {
        Optional<ProfileDto> profileDto = profileService.get(user);
        return ResponseEntity.ok(profileDto.map(dtoMapper::toGetResponse));
    }

    @PutMapping
    public ResponseEntity<UpdateProfileResponse> update(@AuthenticationPrincipal User user, @RequestBody @Valid UpdateProfileRequest updateProfileRequest) {
        ProfileDto profileDto = dtoMapper.fromUpdateRequest(updateProfileRequest);
        ProfileDto response = profileService.update(user, profileDto);
        return ResponseEntity.ok(dtoMapper.toUpdateResponse(response));
    }
}
