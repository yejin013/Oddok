package com.oddok.server.common.errors;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class UserNotPublisherException extends RuntimeException {

    public UserNotPublisherException() {
        super("User not publisher");
    }
}
