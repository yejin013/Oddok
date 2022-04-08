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

    @PostMapping("/{id}")
    public ResponseEntity<?> create(@RequestHeader String userId, @PathVariable Long id) {
        bookmarkService.create(Long.parseLong(userId), id);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<GetBookmarkResponse> get(@RequestHeader String userId) {
        BookmarkDto bookmarkDto = bookmarkService.get(Long.parseLong(userId));
        BookmarkDtoMapper bookmarkDtoMapper = Mappers.getMapper(BookmarkDtoMapper.class);
        GetBookmarkResponse bookmarkResponse = bookmarkDtoMapper.toGetResponse(bookmarkDto);
        return ResponseEntity.ok(bookmarkResponse);
    }
}
