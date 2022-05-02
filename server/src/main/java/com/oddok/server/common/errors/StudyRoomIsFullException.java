package com.oddok.server.common.errors;

public class StudyRoomIsFullException extends RuntimeException{
  public StudyRoomIsFullException(Long id) {
    super("StudyRoom is Full: " + id);
  }
}
