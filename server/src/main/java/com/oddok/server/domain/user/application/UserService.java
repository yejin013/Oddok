package com.oddok.server.domain.user.application;

import com.oddok.server.common.errors.UserNotFoundException;
import com.oddok.server.domain.user.api.request.ChangeNicknameRequest;
import com.oddok.server.domain.user.api.response.ChangeNicknameResponse;
import com.oddok.server.domain.user.dao.UserRepository;
import com.oddok.server.domain.user.dto.UserDto;
import com.oddok.server.domain.user.entity.Role;
import com.oddok.server.domain.user.entity.User;
import com.oddok.server.domain.user.mapper.UserDtoMapper;
import com.oddok.server.domain.user.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private UserRepository userRepository;

    private UserMapper userMapper = Mappers.getMapper(UserMapper.class);

    //TODO: 현재는 임의의 사용자 3명 저장
    @Transactional
    public Long createUser() {
        User maker1 = new User("maker@kakao.com", "maker", Role.USER);
        User savedUser = userRepository.save(maker1);
        userRepository.save(new User("user1@kakao.com", "user1", Role.USER));
        userRepository.save(new User("user2@kakao.com", "user2", Role.USER));
        return savedUser.getId();

    }

    @Transactional
    public UserDto changeNickname(Long userId, String nickname) {
        User user = findUser(userId);
        user.changeNickname(nickname);
        return userMapper.toDto(user);
    }

    public UserDto loadUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));
        return userMapper.toDto(user);
    }

    private User findUser(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));
    }
}
