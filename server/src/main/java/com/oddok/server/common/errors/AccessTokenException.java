package com.oddok.server.common.errors;

public class AccessTokenException extends RuntimeException {
    public AccessTokenException() {
        super("로그인이 되어 있지 않습니다.");
    }
}