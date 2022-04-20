package com.oddok.server.common.errors;

public class StudyRoomEndException extends RuntimeException {

    public StudyRoomEndException(Long id) {
        super("StudyRoom is end: " + id);
    }
}
