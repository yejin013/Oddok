package com.oddok.server.domain.studyroom.application;

import com.oddok.server.common.errors.*;
import com.oddok.server.domain.studyroom.dao.HashtagRepository;
import com.oddok.server.domain.studyroom.dao.StudyRoomRepository;
import com.oddok.server.domain.studyroom.dto.StudyRoomDto;
import com.oddok.server.domain.participant.dao.ParticipantRepository;
import com.oddok.server.domain.studyroom.entity.Hashtag;
import com.oddok.server.domain.participant.entity.Participant;
import com.oddok.server.domain.studyroom.entity.StudyRoom;
import com.oddok.server.domain.studyroom.mapper.StudyRoomMapper;

import com.oddok.server.domain.user.dao.UserRepository;
import com.oddok.server.domain.user.entity.User;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import lombok.RequiredArgsConstructor;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class StudyRoomService {

    private final SessionManager sessionManager;

    private final StudyRoomRepository studyRoomRepository;
    private final UserRepository userRepository;
    private final ParticipantRepository participantRepository;
    private final HashtagRepository hashtagRepository;

    private final StudyRoomMapper studyRoomMapper = Mappers.getMapper(StudyRoomMapper.class);

    @Transactional
    public StudyRoomDto createStudyRoom(User auth, StudyRoomDto studyRoomDto) {
        User user = findUser(auth.getId());
        checkUserIsAlreadyPublisher(user);
        StudyRoom studyRoom = studyRoomMapper.toEntity(studyRoomDto, user);
        studyRoom = studyRoomRepository.save(studyRoom);
        setDefaultName(studyRoomDto, studyRoom);
        mapStudyRoomAndHashtags(studyRoom, studyRoomDto.getHashtags());
        return studyRoomMapper.toDto(studyRoom);
    }

    /**
     * userId의 사용자가 id 방에 참여합니다.
     * 스터디룸 세션에 커넥션을 생성하고 토큰을 반환합니다.
     * @return token
     */
    @Transactional
    public String userJoinStudyRoom(Long id, User auth) {
        StudyRoom studyRoom = findStudyRoom(id);
        User user = findUser(auth.getId());
        checkStudyRoomEnd(id, studyRoom);
        checkUserAlreadyJoined(user);
        checkStudyRoomFull(id, studyRoom);
        String token = getConnectionToken(studyRoom);
        createParticipant(studyRoom, user);
        return token;
    }

    private String getConnectionToken(StudyRoom studyRoom) {
        String sessionId = getSession(studyRoom);
        Optional<String> token = sessionManager.getToken(sessionId);
        if (token.isEmpty()) {
            studyRoom.deleteSession();
            sessionId = getSession(studyRoom);
            studyRoom.createSession(sessionId);
            token = sessionManager.getToken(sessionId);
        }
        return token.orElseThrow();
    }

    private void checkStudyRoomFull(Long id, StudyRoom studyRoom) {
        if (studyRoom.getCurrentUsers() >= studyRoom.getLimitUsers()) { // 정원이 찬 스터디룸에는 참여할 수 없다.
            throw new StudyRoomIsFullException(id);
        }
    }

    // 사용자가 기존에 참여중인 스터디룸이 있으면 퇴장시킨다.
    private void checkUserAlreadyJoined(User auth) {
        User user = findUser(auth.getId());
        participantRepository.findByUser(user)
                .ifPresent(participant -> userLeaveStudyRoom(participant.getStudyRoom().getId(), user));
    }

    private void checkStudyRoomEnd(Long id, StudyRoom studyRoom) {
        if (studyRoom.getEndAt().isBefore(LocalDate.now())) { // 기간이 지난 스터디룸에는 참여할 수 없다.
            throw new StudyRoomEndException(id);
        }
    }

    /**
     * 해당 스터디룸의 sessionId 가 없으면 Openvidu 세션을 생성/등록 후 반환하고, 있으면 해당 세션아이디를 반환합니다.
     */
    private String getSession(StudyRoom studyRoom) {
        if (studyRoom.getSessionId() == null || studyRoom.getSessionId().isBlank()) {
            studyRoom.createSession(sessionManager.createSession());
        }
        return studyRoom.getSessionId();
    }

    /**
     * 스터디룸을 수정합니다. 방장이 아닐 경우 수정할 수 없으므로 예외를 발생시킵니다.
     */
    @Transactional
    public StudyRoomDto updateStudyRoom(StudyRoomDto requestDto) {
        StudyRoom studyRoom = findStudyRoom(requestDto.getId());
        studyRoom.update(requestDto);
        mapStudyRoomAndHashtags(studyRoom, requestDto.getHashtags());
        return studyRoomMapper.toDto(studyRoom);
    }

    public List<StudyRoomDto> getAllStudyRoomForDelete() {
        return studyRoomMapper.toDtoList(studyRoomRepository.findAllByEndAtIsBefore(LocalDate.now()));
    }

    @Transactional
    public void deleteStudyRoom(Long id) {
        StudyRoom studyRoom = findStudyRoom(id);
        if (studyRoom.getSessionId() != null) { // 세션이 살아있으면 세션 삭제
            sessionManager.deleteSession(studyRoom.getSessionId());
        }
        studyRoomRepository.delete(studyRoom);
    }

    /**
     * 사용자가 스터디룸을 나가는 과정 1. 참여자 테이블에서 삭제 2. 스터디룸의 참여자 수 1 감소 3. 참여자수가 0일 경우 세션 삭제
     */
    @Transactional
    public void userLeaveStudyRoom(Long studyRoomId, User auth) {
        User user = findUser(auth.getId());
        StudyRoom studyRoom = findStudyRoom(studyRoomId);
        deleteUserFromParticipant(user, studyRoom);
        studyRoom.decreaseCurrentUsers();
        checkAllUserExit(studyRoom);
    }

    public void checkPassword(Long id, String password) {
        StudyRoom studyRoom = findStudyRoom(id);

        if (studyRoom.getIsPublic()) {
            throw new WrongApproachException();
        }
        if (!studyRoom.getPassword().equals(password)) {
            throw new PasswordsNotMatchException();
        }
    }

    public void checkPublisher(Long studyRoomId, User auth) {
        User publisher = findStudyRoom(studyRoomId).getUser();
        User user = findUser(auth.getId());
        if (!publisher.equals(user)) {
            throw new UserNotPublisherException(user.getId());
        }
    }

    private void deleteUserFromParticipant(User auth, StudyRoom studyRoom) {
        User user = findUser(auth.getId());
        Participant participant = participantRepository.findByUser(user)
                .orElseThrow(() -> new UserNotParticipatingException(user.getId(), studyRoom.getId()));
        if (!participant.getStudyRoom().equals(studyRoom)) {
            throw new UserNotParticipatingException(user.getId(), studyRoom.getId());
        }
        participantRepository.delete(participant);
    }

    private void checkAllUserExit(StudyRoom studyRoom) {
        if (studyRoom.getCurrentUsers() == 0) { // 모두 나갔으면 세션삭제
            sessionManager.deleteSession(studyRoom.getSessionId());
            studyRoom.deleteSession();
        }
    }

    private void setDefaultName(StudyRoomDto studyRoomDto, StudyRoom studyRoom) {
        if (studyRoomDto.getName() == null) {
            studyRoom.update(studyRoomDto);
        }
    }

    // 사용자는 하나의 스터디룸만 개설할 수 있습니다.
    private void checkUserIsAlreadyPublisher(User auth) {
        User user = findUser(auth.getId());
        if (studyRoomRepository.existsByUser(user)) {
            throw new UserAlreadyPublishStudyRoomException(user.getId());
        }
    }

    private void createParticipant(StudyRoom studyRoom, User auth) {
        User user = findUser(auth.getId());
        // 참가자 정보 저장
        Participant participant = Participant.builder()
                .studyRoom(studyRoom)
                .user(user)
                .build();
        // 현재 사용자 수 증가
        studyRoom.increaseCurrentUsers();
        participantRepository.save(participant);
    }

    /**
     * DB에 해당 해시태그 이름이 없으면 생성하고, 있으면 있는 해시태그와 스터디룸을 매핑해줍니다.
     */
    private void mapStudyRoomAndHashtags(StudyRoom studyRoom, Set<String> newHashtags) {
        for (String name : newHashtags) {
            Hashtag hashtag = hashtagRepository.findByName(name)
                    .orElseGet(() -> hashtagRepository.save(new Hashtag(name)));
            studyRoom.addHashtag(hashtag);
        }
    }

    private StudyRoom findStudyRoom(Long id) {
        return studyRoomRepository.findById(id)
                .orElseThrow(() -> new StudyRoomNotFoundException(id));
    }

    private User findUser(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
    }
}
