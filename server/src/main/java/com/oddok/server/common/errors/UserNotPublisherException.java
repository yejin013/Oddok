package com.oddok.server.common.errors;

public class UserNotPublisherException extends RuntimeException {

    public UserNotPublisherException() {
        super("User not publisher");
    }
}
