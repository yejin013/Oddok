package com.oddok.server.common.errors;

public class UserAlreadyPublishStudyRoomException extends RuntimeException{
    public UserAlreadyPublishStudyRoomException(Long id) {
        super("A user "+id+" has already published a study room");
    }


}
