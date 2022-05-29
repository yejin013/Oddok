package com.oddok.server.domain.user.application;

import com.oddok.server.common.errors.UserNotFoundException;
import com.oddok.server.domain.user.dao.UserRepository;
import com.oddok.server.domain.user.dto.UserDto;
import com.oddok.server.domain.user.entity.Role;
import com.oddok.server.domain.user.entity.User;
import com.oddok.server.domain.user.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;

    private final UserMapper userMapper = Mappers.getMapper(UserMapper.class);

    //TODO: 현재는 임의의 사용자 3명 저장
    @Transactional
    public Long createUser() {
        User maker1 = new User("maker@kakao.com", "maker", Role.USER);
        User savedUser = userRepository.save(maker1);
        userRepository.save(new User("user1@kakao.com", "user1", Role.USER));
        userRepository.save(new User("user2@kakao.com", "user2", Role.USER));
        userRepository.save(new User("user3@kakao.com", "user3", Role.USER));
        userRepository.save(new User("user4@kakao.com", "user4", Role.USER));
        userRepository.save(new User("user5@kakao.com", "user5", Role.USER));
        userRepository.save(new User("user6@kakao.com", "user6", Role.USER));
        userRepository.save(new User("user7@kakao.com", "user7", Role.USER));
        userRepository.save(new User("user8@kakao.com", "user8", Role.USER));
        userRepository.save(new User("user9@kakao.com", "user9", Role.USER));
        return savedUser.getId();

    }

    @Transactional
    public UserDto changeNickname(Long userId, String nickname) {
        User user = findUser(userId);
        user.changeNickname(nickname);
        return userMapper.toDto(user);
    }

    private User findUser(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));
    }
}
