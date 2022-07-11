package com.oddok.server.common.errors;

public class SocialDataNotFoundException extends RuntimeException {
    public SocialDataNotFoundException() {
        super("Social Data not found");
    }
}
