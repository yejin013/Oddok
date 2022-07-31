package com.oddok.server.domain.bookmark.application;

import com.oddok.server.common.errors.StudyRoomNotFoundException;
import com.oddok.server.domain.bookmark.dao.BookmarkRepository;
import com.oddok.server.domain.bookmark.dto.BookmarkDto;
import com.oddok.server.domain.participant.dao.ParticipantRepository;
import com.oddok.server.domain.bookmark.entity.Bookmark;
import com.oddok.server.domain.participant.dto.ParticipantDto;
import com.oddok.server.domain.bookmark.mapper.BookmarkMapper;
import com.oddok.server.domain.participant.mapper.ParticipantMapper;
import com.oddok.server.domain.studyroom.dao.StudyRoomRepository;
import com.oddok.server.domain.studyroom.entity.StudyRoom;
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

    private final BookmarkMapper bookmarkMapper = Mappers.getMapper(BookmarkMapper.class);
    private final ParticipantMapper participantMapper = Mappers.getMapper(ParticipantMapper.class);

    /**
     * 북마크 생성
     */
    @Transactional
    public BookmarkDto create(User user, Long studyRoomId) {
        StudyRoom studyRoom = findStudyRoom(studyRoomId);

        Bookmark bookmark = bookmarkRepository.findByUser(user);
        if(bookmark != null) {
           bookmark.changeStudyRoom(studyRoom);
        } else {
            bookmark = bookmarkRepository.save(Bookmark.builder()
                    .user(user)
                    .studyRoom(studyRoom)
                    .build());
        }

        List<ParticipantDto> participants = participantMapper.toDto(
                participantRepository.findTop5ByStudyRoomOrderByJoinTimeAsc(studyRoom)
        );

        return bookmarkMapper.toDto(bookmark.getStudyRoom(), participants);
    }

    /**
     * 북마크 조회
     * @return
     */
    public Optional<BookmarkDto> get(User user) {
        Bookmark bookmark = bookmarkRepository.findByUser(user);

        if(bookmark == null)
            return Optional.empty();

        StudyRoom studyRoom = bookmark.getStudyRoom();

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