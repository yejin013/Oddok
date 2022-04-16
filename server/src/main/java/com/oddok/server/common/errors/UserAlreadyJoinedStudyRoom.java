package com.oddok.server.common.errors;

public class UserAlreadyJoinedStudyRoom extends RuntimeException{
    public UserAlreadyJoinedStudyRoom() {
        super("User Already Joined in Any StudyRoom");
    }
}
