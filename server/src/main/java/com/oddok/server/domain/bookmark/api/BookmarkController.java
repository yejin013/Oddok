package com.oddok.server.domain.bookmark.api;

import com.oddok.server.domain.bookmark.api.response.GetBookmarkResponse;
import com.oddok.server.domain.bookmark.application.BookmarkService;
import com.oddok.server.domain.bookmark.dto.BookmarkDto;
import com.oddok.server.domain.bookmark.mapper.BookmarkDtoMapper;
import lombok.RequiredArgsConstructor;
import org.mapstruct.factory.Mappers;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bookmark")
@RequiredArgsConstructor
public class BookmarkController {

    private final BookmarkService bookmarkService;

    /**
     * 북마크 생성 및 변경
     * @param userId : 사용자 정보
     * @param id : 스터디룸 정보
     * @return
     */
    @PostMapping("/{id}")
    public ResponseEntity<?> create(@RequestHeader String userId, @PathVariable Long id) {
        bookmarkService.create(Long.parseLong(userId), id);
        return ResponseEntity.ok().build();
    }

    /**
     * 북마크 정보 가져오기
     * @param userId : 사용자 정보
     * @return
     */
    @GetMapping
    public ResponseEntity<GetBookmarkResponse> get(@RequestHeader String userId) {
        BookmarkDto bookmarkDto = bookmarkService.get(Long.parseLong(userId));
        BookmarkDtoMapper bookmarkDtoMapper = Mappers.getMapper(BookmarkDtoMapper.class);
        GetBookmarkResponse bookmarkResponse = bookmarkDtoMapper.toGetResponse(bookmarkDto);
        return ResponseEntity.ok(bookmarkResponse);
    }
}
