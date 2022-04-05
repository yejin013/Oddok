package com.oddok.server.domain.studyroom.application;

import com.oddok.server.common.errors.*;
import com.oddok.server.domain.studyroom.dao.HashtagRepository;
import com.oddok.server.domain.studyroom.dao.StudyRoomRepository;
import com.oddok.server.domain.studyroom.dto.StudyRoomDto;
import com.oddok.server.domain.studyroom.dao.ParticipantRepository;
import com.oddok.server.domain.studyroom.entity.Hashtag;
import com.oddok.server.domain.studyroom.entity.Participant;
import com.oddok.server.domain.studyroom.entity.StudyRoom;
import com.oddok.server.domain.studyroom.entity.StudyRoomHashtag;
import com.oddok.server.domain.studyroom.mapper.StudyRoomMapper;
import com.oddok.server.domain.user.dao.UserRepository;

import com.oddok.server.domain.user.entity.User;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

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
    public Long createStudyRoom(StudyRoomDto studyRoomDto) {
        User user = findUser(studyRoomDto.getUserId());
        StudyRoom studyRoom = studyRoomMapper.toEntity(studyRoomDto, user);
        studyRoom = studyRoomRepository.save(studyRoom);
        mapStudyRoomAndHashtags(studyRoom, studyRoomDto.getHashtags());
        return studyRoom.getId();
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
    public StudyRoomDto updateStudyRoom(Long id, StudyRoomDto studyRoomDto) {
        StudyRoom studyRoom = studyRoomRepository.findById(id).orElseThrow(() -> new StudyRoomNotFoundException(id));
        checkPublisher(studyRoom.getUser(), studyRoomDto.getUserId());
        studyRoom = studyRoom.update(studyRoomDto);
        mapStudyRoomAndHashtags(studyRoom, studyRoomDto.getHashtags());
        return studyRoomMapper.toDto(studyRoom.update(studyRoomDto));
    }

    public void createParticipant(Long id, Long userId) {
        User user = findUser(userId);
        StudyRoom studyRoom = findStudyRoom(id);

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

    /**
     * DB에 해당 해시태그 이름이 없으면 생성하고, 있으면 있는 해시태그와 스터디룸을 매핑해줍니다.
     */
    public void mapStudyRoomAndHashtags(StudyRoom studyRoom, Set<String> hashtags) {
        // 처음부터 있던 해시태그 삭제
        for (StudyRoomHashtag studyRoomHashtag : studyRoom.getHashtags()){
            hashtags.remove(studyRoomHashtag.getHashtag().getName());
        }
        // 없던 해시태그 추가
        for (String name : hashtags) {
            Hashtag hashtag = hashtagRepository.findByName(name).orElseGet(() -> hashtagRepository.save(new Hashtag(name)));
            studyRoom.addHastag(hashtag);
        }
    }

    private StudyRoom findStudyRoom(Long id) {
        return studyRoomRepository.findById(id)
                .orElseThrow(() -> new StudyRoomNotFoundException(id));
    }

    private void checkPublisher(User publisher, Long userId) {
        if (!publisher.getId().equals(userId)) throw new UserNotPublisherException(userId);
    }

    private User findUser(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));
    }

    @Transactional
    public void deleteStudyRoom(Long id, Long userId) {
        StudyRoom studyRoom = findStudyRoom(id);
        checkPublisher(studyRoom.getUser(), userId);
        studyRoomRepository.delete(studyRoom);
    }
}
