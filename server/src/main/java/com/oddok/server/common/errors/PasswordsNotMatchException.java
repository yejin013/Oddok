package com.oddok.server.common.errors;

public class PasswordsNotMatchException extends RuntimeException{
    public PasswordsNotMatchException() {
        super("Passwords don't match");
    }
}
