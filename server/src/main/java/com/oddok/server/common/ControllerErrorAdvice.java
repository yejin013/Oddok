package com.oddok.server.common;

import com.oddok.server.common.errors.OpenviduServerException;
import com.oddok.server.common.errors.SessionNotFoundException;
import com.oddok.server.common.errors.StudyRoomNotFoundException;
import com.oddok.server.common.errors.UserNotFoundException;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.persistence.EntityNotFoundException;

@RestControllerAdvice
public class ControllerErrorAdvice {

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler({
            OpenviduServerException.class,
            OpenViduHttpException.class,
            OpenViduJavaClientException.class
    })
    public ErrorResponse handleOpenViduException() {
        return new ErrorResponse("Openvidu 서버 에러");
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(UserNotFoundException.class)
    public ErrorResponse handleUserNotFoundException() {
        return new ErrorResponse("해당 사용자가 없습니다.");
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(SessionNotFoundException.class)
    public ErrorResponse handleSessionNotFoundException() {
        return new ErrorResponse("해당 세션이 없습니다.");
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(StudyRoomNotFoundException.class)
    public ErrorResponse handleStudyRoomNotFoundException() {
        return new ErrorResponse("해당 스터디방이 없습니다.");
    }

}
