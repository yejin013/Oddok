package com.oddok.server.domain.user.application;

import com.oddok.server.common.errors.UserNotFoundException;
import com.oddok.server.domain.user.dao.UserRepository;
import com.oddok.server.domain.user.dto.UserDto;
import com.oddok.server.domain.user.entity.User;
import com.oddok.server.domain.user.mapper.UserMapper;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class UserService {

    private UserRepository userRepository;

    private UserMapper userMapper = Mappers.getMapper(UserMapper.class);

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    //TODO: 현재는 임의의 사용자 3명 저장
    @Transactional
    public Long createUser() {
        User maker1 = new User("maker@kakao.com");
        User savedUser = userRepository.save(maker1);
        userRepository.save(new User("user1@kakao.com"));
        userRepository.save(new User("user2@kakao.com"));
        return savedUser.getId();

    }

    public UserDto loadUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException());
        return userMapper.toDto(user);
    }

}
