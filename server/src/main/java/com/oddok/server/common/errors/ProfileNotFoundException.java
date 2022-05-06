package com.oddok.server.common.errors;

public class ProfileNotFoundException extends RuntimeException{
    public ProfileNotFoundException(Long userId) {
        super(userId + "'s profile Not Found");
    }
}
