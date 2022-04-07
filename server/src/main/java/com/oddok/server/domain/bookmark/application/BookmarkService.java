package com.oddok.server.domain.bookmark.application;

import com.oddok.server.common.errors.StudyRoomNotFoundException;
import com.oddok.server.common.errors.UserNotFoundException;
import com.oddok.server.domain.bookmark.dao.BookmarkRepository;
import com.oddok.server.domain.bookmark.entity.Bookmark;
import com.oddok.server.domain.studyroom.dao.StudyRoomRepository;
import com.oddok.server.domain.studyroom.entity.StudyRoom;
import com.oddok.server.domain.user.dao.UserRepository;
import com.oddok.server.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final UserRepository userRepository;
    private final StudyRoomRepository studyRoomRepository;

    /**
     * 북마크 생성
     */
    @Transactional
    public void create(Long userId, Long studyRoomId) {
        User user = findUser(userId);
        StudyRoom studyRoom = findStudyRoom(studyRoomId);

        Optional<Bookmark> bookmark = bookmarkRepository.findByUser(user);
        if(bookmark.isPresent()) {
           bookmark.get().setStudyRoom(studyRoom);
        } else {
            bookmarkRepository.save(Bookmark.builder()
                    .user(user)
                    .studyRoom(studyRoom)
                    .build());
        }
    }

    /**
     * 유저 정보 검색
     */
    private User findUser(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));
    }

    /**
     * 스터디룸 정보 검색
     */
    private StudyRoom findStudyRoom(Long studyRoomId) {
        return studyRoomRepository.findById(studyRoomId).orElseThrow(() -> new StudyRoomNotFoundException(studyRoomId));
    }
}
