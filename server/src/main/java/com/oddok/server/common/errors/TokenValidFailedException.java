package com.oddok.server.common.errors;

public class TokenValidFailedException extends RuntimeException {
    public TokenValidFailedException() {
        super("Token Valid Failed");
    }
}