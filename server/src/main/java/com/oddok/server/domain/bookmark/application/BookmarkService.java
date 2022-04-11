package com.oddok.server.domain.bookmark.application;

import com.oddok.server.common.errors.BookmarkNotFoundException;
import com.oddok.server.domain.bookmark.dao.BookmarkRepository;
import com.oddok.server.domain.participant.application.ParticipantService;
import com.oddok.server.domain.bookmark.dto.BookmarkDto;
import com.oddok.server.domain.bookmark.entity.Bookmark;
import com.oddok.server.domain.participant.dto.ParticipantDto;
import com.oddok.server.domain.studyroom.application.StudyRoomService;
import com.oddok.server.domain.bookmark.mapper.BookmarkMapper;
import com.oddok.server.domain.studyroom.entity.StudyRoom;
import com.oddok.server.domain.user.application.UserService;
import com.oddok.server.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BookmarkService {

    private final UserService userService;
    private final StudyRoomService studyRoomService;
    private final ParticipantService participantService;

    private final BookmarkRepository bookmarkRepository;

    /**
     * 북마크 생성
     */
    @Transactional
    public void create(Long userId, Long studyRoomId) {
        User user = userService.findUser(userId);
        StudyRoom studyRoom = studyRoomService.findStudyRoom(studyRoomId);

        Optional<Bookmark> bookmark = bookmarkRepository.findByUser(user);
        if(bookmark.isPresent()) {
           bookmark.get().changeStudyRoom(studyRoom);
        } else {
            bookmarkRepository.save(Bookmark.builder()
                    .user(user)
                    .studyRoom(studyRoom)
                    .build());
        }
    }

    /**
     * 북마크 조회
     */
    public BookmarkDto get(Long userId) {
        User user = userService.findUser(userId);
        Bookmark bookmark = bookmarkRepository.findByUser(user).orElseThrow(() -> new BookmarkNotFoundException());
        StudyRoom studyRoom = bookmark.getStudyRoom();
        List<ParticipantDto> participant = participantService.get(studyRoom);
        BookmarkMapper bookmarkMapper = Mappers.getMapper(BookmarkMapper.class);
        return bookmarkMapper.toDto(studyRoom, participant);
    }

    /**
     * 북마크 삭제
     */
    @Transactional
    public void delete(Long userId) {
        User user = userService.findUser(userId);
        bookmarkRepository.deleteByUser(user);
    }
}
