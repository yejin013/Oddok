package com.oddok.server.domain.bookmark.api;

import com.oddok.server.domain.bookmark.api.response.GetBookmarkResponse;
import com.oddok.server.domain.bookmark.application.BookmarkService;
import com.oddok.server.domain.bookmark.dto.BookmarkDto;
import com.oddok.server.domain.bookmark.mapper.BookmarkDtoMapper;
import com.oddok.server.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.mapstruct.factory.Mappers;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/bookmark")
@RequiredArgsConstructor
public class BookmarkController {

    private final BookmarkService bookmarkService;

    private final BookmarkDtoMapper bookmarkDtoMapper = Mappers.getMapper(BookmarkDtoMapper.class);

    /**
     * 북마크 생성 및 변경
     * @param user : 사용자 정보
     * @param id : 스터디룸 정보
     * @return
     */
    @PostMapping("/{id}")
    public ResponseEntity<?> create(@AuthenticationPrincipal User user, @PathVariable Long id) {
        BookmarkDto bookmarkDto = bookmarkService.create(user, id);
        return ResponseEntity.ok(bookmarkDtoMapper.toGetResponse(bookmarkDto));
    }

    /**
     * 북마크 정보 가져오기
     * @param user : 사용자 정보
     * @return
     */
    @GetMapping
    public ResponseEntity<Optional<GetBookmarkResponse>> get(@AuthenticationPrincipal User user) {
        Optional<BookmarkDto> bookmarkDto = bookmarkService.get(user);
        return ResponseEntity.ok(bookmarkDto.map(bookmarkDtoMapper::toGetResponse));
    }

    @DeleteMapping
    public ResponseEntity<?> delete(@AuthenticationPrincipal User user) {
        bookmarkService.delete(user);
        return ResponseEntity.noContent().build();
    }
}
