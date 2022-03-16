package com.oddok.server.domain.studyroom.api.response;

import org.springframework.http.HttpStatus;

public class TokenResponse {

    HttpStatus httpStatus;
    String token;

    public TokenResponse(HttpStatus httpStatus, String token) {
        this.httpStatus = httpStatus;
        this.token = token;
    }
}
