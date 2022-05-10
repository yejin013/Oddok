package com.oddok.server.common.errors;

public class UserNotParticipatingException extends RuntimeException{
    public UserNotParticipatingException(Long userId,Long studyRoomId) {
    super("User "+userId+ "is not participating " + studyRoomId);
  }
}
