package com.oddok.server.domain.user.application;

import com.oddok.server.common.errors.UserNotFoundException;
import com.oddok.server.common.jwt.JwtTokenProvider;
import com.oddok.server.domain.studyroom.dao.StudyRoomRepository;
import com.oddok.server.domain.studyroom.dto.StudyRoomDto;
import com.oddok.server.domain.studyroom.entity.StudyRoom;
import com.oddok.server.domain.studyroom.mapper.StudyRoomMapper;
import com.oddok.server.domain.user.dao.UserRepository;
import com.oddok.server.domain.user.dto.TokensDto;
import com.oddok.server.domain.user.dto.UserDto;
import com.oddok.server.domain.user.entity.Role;
import com.oddok.server.domain.user.entity.User;
import com.oddok.server.domain.user.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;
    private final StudyRoomRepository studyRoomRepository;
    private final JwtTokenProvider authTokenProvider;

    private final UserMapper userMapper = Mappers.getMapper(UserMapper.class);
    private final StudyRoomMapper studyRoomMapper = Mappers.getMapper(StudyRoomMapper.class);

    //TODO: 현재는 임의의 사용자 3명 저장
    @Transactional
    public TokensDto createUser() {
        User maker1 = new User("maker@kakao.com", "maker", Role.USER);
        User savedUser = userRepository.save(maker1);
        savedUser.updateRefreshToken(authTokenProvider.createRefreshToken(savedUser.getId().toString(), savedUser.getEmail(), savedUser.getRole()));
        userRepository.save(new User("user1@kakao.com", "user1", Role.USER));
        userRepository.save(new User("user2@kakao.com", "user2", Role.USER));
        userRepository.save(new User("user3@kakao.com", "user3", Role.USER));
        userRepository.save(new User("user4@kakao.com", "user4", Role.USER));
        userRepository.save(new User("user5@kakao.com", "user5", Role.USER));
        userRepository.save(new User("user6@kakao.com", "user6", Role.USER));
        userRepository.save(new User("user7@kakao.com", "user7", Role.USER));
        userRepository.save(new User("user8@kakao.com", "user8", Role.USER));
        userRepository.save(new User("user9@kakao.com", "user9", Role.USER));

        return TokensDto.builder()
                .accessToken(authTokenProvider.createAccessToken(savedUser.getId().toString(), savedUser.getEmail(), savedUser.getRole()))
                .refreshToken(savedUser.getRefreshToken())
                .build();
    }

    @Transactional
    public UserDto changeNickname(User user, String nickname) {
        user.changeNickname(nickname);
        return userMapper.toDto(user);
    }

    public UserDto getUserInfo(Long userId) {
        User user = findUser(userId);
        return userMapper.toDto(user);
    }

    private User findUser(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));
    }

    /**
     * 사용자가 개설한 스터디룸을 가져옵니다.
     *
     * @param user 사용자 식별자
     * @return 개설한 스터디룸 (없을 경우 빈 객체)
     */
    public Optional<StudyRoomDto> loadMyStudyRoom(User user) {
        Optional<StudyRoom> studyRoom = studyRoomRepository.findByUser(user);
        return studyRoom.map(studyRoomMapper::toDto);
    }

}
