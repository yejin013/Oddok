package com.oddok.server.domain.bookmark.api;

import com.oddok.server.domain.bookmark.application.BookmarkService;
import lombok.RequiredArgsConstructor;
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
}
