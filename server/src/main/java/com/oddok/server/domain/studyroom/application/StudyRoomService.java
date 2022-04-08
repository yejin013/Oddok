package com.oddok.server.domain.studyroom.application;

import com.oddok.server.common.errors.*;
import com.oddok.server.domain.studyroom.dao.HashtagRepository;
import com.oddok.server.domain.studyroom.dao.StudyRoomRepository;
import com.oddok.server.domain.studyroom.dto.StudyRoomDto;
import com.oddok.server.domain.studyroom.dao.ParticipantRepository;
import com.oddok.server.domain.studyroom.entity.Hashtag;
import com.oddok.server.domain.studyroom.entity.Participant;
import com.oddok.server.domain.studyroom.entity.StudyRoom;
import com.oddok.server.domain.studyroom.mapper.StudyRoomMapper;
import com.oddok.server.domain.user.dao.UserRepository;

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

    private final UserRepository userRepository;
    private final StudyRoomRepository studyRoomRepository;
    private final ParticipantRepository participantRepository;
    private final HashtagRepository hashtagRepository;

    private final StudyRoomMapper studyRoomMapper = Mappers.getMapper(StudyRoomMapper.class);

    @Transactional
    public StudyRoomDto createStudyRoom(StudyRoomDto studyRoomDto) {
        User user = findUser(studyRoomDto.getUserId());
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
        studyRoomRepository.delete(studyRoom);
    }

    @Transactional
    public void createParticipant(Long id, Long userId) {
        User user = findUser(userId);
        StudyRoom studyRoom = findStudyRoom(id);

        // 현재 사용자 수 증가
        studyRoom.increaseCurrentUsers();

        // 참가자 정보 저장
        Participant participant = Participant.builder()
                .studyRoom(studyRoom)
                .user(user)
                .build();
        participantRepository.save(participant);
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

    private StudyRoom findStudyRoom(Long id) {
        return studyRoomRepository.findById(id)
                .orElseThrow(() -> new StudyRoomNotFoundException(id));
    }


    private User findUser(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));
    }

}
