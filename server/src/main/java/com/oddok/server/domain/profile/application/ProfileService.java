package com.oddok.server.domain.profile.application;

import com.oddok.server.common.errors.ProfileAlreadyExistsException;
import com.oddok.server.common.errors.ProfileNotFoundException;
import com.oddok.server.common.errors.UserNotFoundException;
import com.oddok.server.domain.profile.dao.ProfileRepository;
import com.oddok.server.domain.profile.dto.ProfileDto;
import com.oddok.server.domain.profile.entity.Profile;
import com.oddok.server.domain.profile.mapper.ProfileMapper;
import com.oddok.server.domain.user.dao.UserRepository;
import com.oddok.server.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;

    private final ProfileMapper profileMapper = Mappers.getMapper(ProfileMapper.class);

    @Transactional
    public ProfileDto create(ProfileDto profileDto) {
        User user = findUser(profileDto.getUserId());

        if (profileRepository.findByUser(user).isPresent()){
            throw new ProfileAlreadyExistsException(user.getId());
        }

        Profile profile = profileMapper.toEntity(profileDto, user);
        return profileMapper.toDto(profileRepository.save(profile));
    }

    @Transactional
    public ProfileDto update(ProfileDto profileDto) {
        User user = findUser(profileDto.getUserId());
        Profile profile = profileRepository.findByUser(user)
                .orElseThrow(() -> new ProfileNotFoundException(user.getId()));
        profile.update(profileDto.getGoal(), profileDto.getTargetTime(), profileDto.getDday());
        return profileMapper.toDto(profile);
    }

    private User findUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));
    }
}
