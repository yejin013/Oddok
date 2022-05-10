package com.oddok.server.common.errors;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class OpenviduServerException extends RuntimeException {
    public OpenviduServerException(String message, Throwable cause) {
        super(message, cause);
        log.error("openvidu server error message = {}, cause = {]", message, cause);
    }
}
