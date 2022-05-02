package com.oddok.server.common.errors;

public class ProfileAlreadyExistsException extends RuntimeException{
    public ProfileAlreadyExistsException(Long userId) {
        super(userId + "'s profile Already Exists Found");
    }
}
