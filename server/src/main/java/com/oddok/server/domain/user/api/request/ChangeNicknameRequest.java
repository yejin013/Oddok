package com.oddok.server.domain.user.api.request;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class ChangeNicknameRequest {
    @NotBlank
    private String nickname;
}
