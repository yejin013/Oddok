package com.oddok.server.domain.studyroom.api.request;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class CheckPasswordRequest {
    @NotBlank(message = "비밀번호를 입력하지 않았습니다.")
    private String password;
}
