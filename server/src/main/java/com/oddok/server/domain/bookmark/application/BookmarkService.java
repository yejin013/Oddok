package com.oddok.server.domain.bookmark.application;

import com.oddok.server.common.errors.StudyRoomNotFoundException;
import com.oddok.server.common.errors.UserNotFoundException;
import com.oddok.server.domain.bookmark.dao.BookmarkRepository;
import com.oddok.server.domain.bookmark.dto.BookmarkDto;
import com.oddok.server.domain.participant.dao.ParticipantRepository;
import com.oddok.server.domain.bookmark.entity.Bookmark;
import com.oddok.server.domain.participant.dto.ParticipantDto;
import com.oddok.server.domain.bookmark.mapper.BookmarkMapper;
import com.oddok.server.domain.participant.mapper.ParticipantMapper;
import com.oddok.server.domain.studyroom.dao.StudyRoomRepository;
import com.oddok.server.domain.studyroom.entity.StudyRoom;
import com.oddok.server.domain.user.dao.UserRepository;
import com.oddok.server.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final StudyRoomRepository studyRoomRepository;
    private final ParticipantRepository participantRepository;

    /**
     * 북마크 생성
     */
    @Transactional
    public void create(User user, Long studyRoomId) {
        StudyRoom studyRoom = findStudyRoom(studyRoomId);

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
     * @return
     */
    public Optional<BookmarkDto> get(User user) {
        Optional<Bookmark> bookmark = bookmarkRepository.findByUser(user);

        if(bookmark.isEmpty())
            return Optional.empty();

        StudyRoom studyRoom = bookmark.get().getStudyRoom();

        ParticipantMapper participantMapper = Mappers.getMapper(ParticipantMapper.class);
        List<ParticipantDto> participants = participantMapper.toDto(
                participantRepository.findTop5ByStudyRoomOrderByJoinTimeAsc(studyRoom)
        );

        BookmarkMapper bookmarkMapper = Mappers.getMapper(BookmarkMapper.class);
        return Optional.of(bookmarkMapper.toDto(studyRoom, participants));
    }

    /**
     * 북마크 삭제
     */
    @Transactional
    public void delete(User user) {
        bookmarkRepository.deleteByUser(user);
    }

    /**
     * 스터디룸 정보 검색
     */
    private StudyRoom findStudyRoom(Long studyRoomId) {
        return studyRoomRepository.findByIdAndEndAtIsGreaterThanEqual(studyRoomId, LocalDate.now())
                .orElseThrow(() -> new StudyRoomNotFoundException(studyRoomId));
    }
}