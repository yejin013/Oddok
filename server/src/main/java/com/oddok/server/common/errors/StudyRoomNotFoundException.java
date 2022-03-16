package com.oddok.server.common.errors;

public class StudyRoomNotFoundException  extends RuntimeException {
    public StudyRoomNotFoundException(Long id) {
        super("Study Room is not found: " + id);
    }
}