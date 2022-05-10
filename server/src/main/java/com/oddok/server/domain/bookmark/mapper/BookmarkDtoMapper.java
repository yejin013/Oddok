package com.oddok.server.domain.bookmark.mapper;

import com.oddok.server.domain.bookmark.api.response.GetBookmarkResponse;
import com.oddok.server.domain.bookmark.dto.BookmarkDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BookmarkDtoMapper {
    GetBookmarkResponse toGetResponse(BookmarkDto bookmarkDto);
}
