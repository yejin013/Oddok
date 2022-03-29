package com.oddok.server.domain.user.mapper;

import com.oddok.server.common.mapper.GenericMapper;
import com.oddok.server.domain.user.dto.UserInfoDto;
import com.oddok.server.domain.user.entity.User;
import org.mapstruct.Mapper;

@Mapper
public interface UserInfoMapper extends GenericMapper<UserInfoDto, User> {
}
