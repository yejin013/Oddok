package com.oddok.server.common.errors;

public class UserNotPublisherException extends RuntimeException {

    public UserNotPublisherException(Long userId) {
        super("User not publisher" + userId);
    }
}
