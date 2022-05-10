package com.oddok.server.common;

import com.oddok.server.common.errors.*;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

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

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(UserNotFoundException.class)
    public ErrorResponse handleUserNotFoundException() {
        return new ErrorResponse("해당 사용자가 없습니다.");
    }

    /**
     * Openvidu 에 요청 된 SessionId 의 Session 이 없을 경우 에러
     * ex) 스터디룸 참여 / 삭제 요청-응답 사이에 세션이 삭제 된 경우
     */
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(SessionNotFoundException.class)
    public ErrorResponse handleSessionNotFoundException() {
        return new ErrorResponse("스터디룸의 세션이 없거나 이미 삭제되었습니다.");
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(StudyRoomNotFoundException.class)
    public ErrorResponse handleStudyRoomNotFoundException() {
        return new ErrorResponse("해당 스터디룸이 존재하지 않습니다.");
    }

    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler(UserNotPublisherException.class)
    public ErrorResponse handleUserNotPublisherException() {
        return new ErrorResponse("해당 사용자는 스터디룸 생성자가 아닙니다.");
    }

    /**
     * 스터디룸 비밀번호 오류 시
     */
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(PasswordsNotMatchException.class)
    public ErrorResponse handlePasswordsNotMatchException() {
        return new ErrorResponse("스터디룸과의 비밀번호가 일치하지 않습니다.");
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(WrongApproachException.class)
    public ErrorResponse handleWrongApproach() {
        return new ErrorResponse("잘못된 접근입니다.");
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(UserNotParticipatingException.class)
    public ErrorResponse handleUserNotParticipatingException() {
        return new ErrorResponse("해당 유저가 스터디룸에 참여하고 있지 않습니다.");
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(BookmarkNotFoundException.class)
    public ErrorResponse handleBookmarkNotFoundException() {
        return new ErrorResponse("해당 유저의 북마크가 존재하지 않습니다.");
    }

    /**
     * 스터디룸 참여 시
     */
    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler(StudyRoomIsFullException.class)
    public ErrorResponse handleStudyRoomIsFullException() {
        return new ErrorResponse("스터디룸 정원이 꽉 찼습니다.");
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(UserAlreadyJoinedStudyRoom.class)
    public ErrorResponse handleUserAlreadyJoinedStudyRoom() {
        return new ErrorResponse("사용자가 이미 참여중인 스터디룸이 있습니다.");
    }

    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler(StudyRoomEndException.class)
    public ErrorResponse handleStudyRoomEndException() {
        return new ErrorResponse("기간이 지나 참여할 수 없는 스터디룸입니다.");
    }

    /**
     * 스터디룸 생성 시
     */
    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler(UserAlreadyPublishStudyRoomException.class)
    public ErrorResponse handleUserAlreadyPublishStudyRoomException() {
        return new ErrorResponse("사용자가 이미 개설한 방이 있습니다.");
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(ProfileNotFoundException.class)
    public ErrorResponse handleUserProfileNotFoundException() {
        return new ErrorResponse("사용자의 프로필이 존재하지 않습니다.");
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(ProfileAlreadyExistsException.class)
    public ErrorResponse handleUserProfileAlreadyExistsException() {
        return new ErrorResponse("사용자의 프로필이 이미 존재합니다.");
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(TokenValidFailedException.class)
    public ErrorResponse handlerTokenValidFailedException() {
        return new ErrorResponse("토큰이 유효하지 않습니다.");
    }
}
