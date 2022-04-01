package com.oddok.server.domain.user.mapper;

import com.oddok.server.domain.user.dto.UserDto;
import com.oddok.server.domain.user.entity.User;
import org.mapstruct.Mapper;

@Mapper
public interface UserMapper {
    UserDto toDto(User user);
}
