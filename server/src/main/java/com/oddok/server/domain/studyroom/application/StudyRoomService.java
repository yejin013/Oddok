package com.oddok.server.domain.studyroom.application;

import com.oddok.server.common.errors.*;
import com.oddok.server.domain.participant.application.ParticipantService;
import com.oddok.server.domain.studyroom.dao.HashtagRepository;
import com.oddok.server.domain.studyroom.dao.StudyRoomRepository;
import com.oddok.server.domain.studyroom.dto.StudyRoomDto;
import com.oddok.server.domain.studyroom.entity.Hashtag;
import com.oddok.server.domain.studyroom.entity.StudyRoom;
import com.oddok.server.domain.studyroom.mapper.StudyRoomMapper;

import com.oddok.server.domain.user.application.UserService;
import com.oddok.server.domain.user.entity.User;

import java.util.Set;

import lombok.RequiredArgsConstructor;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class StudyRoomService {

    private final SessionService sessionService;
    private final UserService userService;
    private final ParticipantService participantService;

    private final StudyRoomRepository studyRoomRepository;
    private final HashtagRepository hashtagRepository;

    private final StudyRoomMapper studyRoomMapper = Mappers.getMapper(StudyRoomMapper.class);

    @Transactional
    public StudyRoomDto createStudyRoom(StudyRoomDto studyRoomDto) {
        User user = userService.findUser(studyRoomDto.getUserId());
        StudyRoom studyRoom = studyRoomMapper.toEntity(studyRoomDto, user);
        studyRoom = studyRoomRepository.save(studyRoom);
        mapStudyRoomAndHashtags(studyRoom, studyRoomDto.getHashtags());
        return studyRoomMapper.toDto(studyRoom);
    }

    public StudyRoomDto loadStudyRoom(Long id) {
        StudyRoom studyRoom = studyRoomRepository.findById(id)
                .orElseThrow(() -> new StudyRoomNotFoundException(id));
        return studyRoomMapper.toDto(studyRoom);
    }

    /**
     * userId의 사용자가 id 방에 참여합니다.
     * 스터디룸 세션에 커넥션을 생성하고 토큰을 반환합니다.
     * 스터디룸에 참여합니다.
     *
     * @return token
     */
    @Transactional
    public String userJoinStudyRoom(Long userId, Long id) {
        User user = userService.findUser(userId);
        StudyRoom studyRoom = findStudyRoom(id);
        if (studyRoom.getCurrentUsers() >= studyRoom.getLimitUsers()) throw new StudyRoomIsFullException(id);
        String sessionId = getSession(studyRoom);
        String token = sessionService.getToken(sessionId);
        participantService.create(studyRoom, user);
        return token;
    }

    /**
     * 해당 스터디룸의 sessionId 가 없으면 Openvidu 세션을 생성/등록 후 반환하고, 있으면 해당 세션아이디를 반환합니다.
     */
    private String getSession(StudyRoom studyRoom) {
        if (studyRoom.getSessionId() == null) studyRoom.createSession(sessionService.createSession());
        return studyRoom.getSessionId();
    }

    /**
     * 스터디룸을 수정합니다.
     * 방장이 아닐 경우 수정할 수 없으므로 예외를 발생시킵니다.
     */
    @Transactional
    public StudyRoomDto updateStudyRoom(StudyRoomDto requestDto) {
        StudyRoom studyRoom = findStudyRoom(requestDto.getId());
        studyRoom.update(requestDto);
        mapStudyRoomAndHashtags(studyRoom, requestDto.getHashtags());
        return studyRoomMapper.toDto(studyRoom);
    }

    @Transactional
    public void deleteStudyRoom(Long id) {
        StudyRoom studyRoom = findStudyRoom(id);
        if (studyRoom.getSessionId() == null) {
            sessionService.deleteSession(studyRoom.getSessionId());
        }
        studyRoomRepository.delete(studyRoom);
    }

    /**
     * 사용자가 스터디룸을 나가는 과정
     * 1. 참여자 테이블에서 삭제
     * 2. 스터디룸의 참여자 수 1 감소
     * 3. 참여자수가 0일 경우 세션 삭제
     */
    @Transactional
    public void userLeaveStudyRoom(Long userId, Long studyRoomId) {
        StudyRoom studyRoom = findStudyRoom(studyRoomId);
        participantService.delete(userId, studyRoom);
        if (studyRoom.decreaseCurrentUsers() == 0) { // 모두 나갔으면 세션삭제
            sessionService.deleteSession(studyRoom.getSessionId());
        }
        studyRoom.deleteSession();
    }

    public void checkPassword(Long id, String password) {
        StudyRoom studyRoom = findStudyRoom(id);

        if (studyRoom.getIsPublic())
            throw new WrongApproachException();
        if (!studyRoom.getPassword().equals(password))
            throw new PasswordsNotMatchException();
    }

    public void checkPublisher(Long studyRoomId, Long userId) {
        Long publisherId = findStudyRoom(studyRoomId).getUser().getId();
        if (!publisherId.equals(userId)) throw new UserNotPublisherException(userId);
    }

    /**
     * DB에 해당 해시태그 이름이 없으면 생성하고, 있으면 있는 해시태그와 스터디룸을 매핑해줍니다.
     */
    private void mapStudyRoomAndHashtags(StudyRoom studyRoom, Set<String> newHashtags) {
        for (String name : newHashtags) {
            Hashtag hashtag = hashtagRepository.findByName(name).orElseGet(() -> hashtagRepository.save(new Hashtag(name)));
            studyRoom.addHashtag(hashtag);
        }
    }

    public StudyRoom findStudyRoom(Long studyRoomId) {
        return studyRoomRepository.findById(studyRoomId)
                .orElseThrow(() -> new StudyRoomNotFoundException(studyRoomId));
    }
}
