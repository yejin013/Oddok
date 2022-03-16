package com.oddok.server.common;

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

    /*
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler({
            OpenViduJavaClientException.class,
            OpenViduHttpException.class
    })
    public ErrorResponse handleOpenViduException() {
        return new ErrorResponse("Openvidu 서버 에러");
    }
     */

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(UserNotFoundException.class)
    public ErrorResponse handleNotFoundException() {
        return new ErrorResponse("해당 사용자가 없습니다.");
    }

}
