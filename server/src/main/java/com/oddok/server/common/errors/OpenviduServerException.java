package com.oddok.server.common.errors;

public class OpenviduServerException extends RuntimeException {
    public OpenviduServerException(String message, Throwable cause) {
        super(message, cause);
    }
}
