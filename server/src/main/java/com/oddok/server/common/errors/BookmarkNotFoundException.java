package com.oddok.server.common.errors;

public class BookmarkNotFoundException extends RuntimeException{
    public BookmarkNotFoundException(Long userId) {
        super(userId + "'s Bookmark Not Found");
    }
}