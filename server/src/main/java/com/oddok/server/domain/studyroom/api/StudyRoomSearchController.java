package com.oddok.server.domain.studyroom.api;

import com.oddok.server.domain.studyroom.api.response.GetPopularHashtagsResponse;
import com.oddok.server.domain.studyroom.api.response.GetStudyRoomListEntityResponse;
import com.oddok.server.domain.studyroom.application.HashtagService;
import com.oddok.server.domain.studyroom.application.StudyRoomSearchService;
import com.oddok.server.domain.studyroom.dto.StudyRoomDto;
import com.oddok.server.domain.studyroom.mapper.StudyRoomDtoMapper;
import lombok.RequiredArgsConstructor;
import org.mapstruct.factory.Mappers;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/search")
@RequiredArgsConstructor
public class StudyRoomSearchController {

    private final HashtagService hashtagService;
    private final StudyRoomSearchService studyRoomSearchService;
    private final StudyRoomDtoMapper dtoMapper = Mappers.getMapper(StudyRoomDtoMapper.class);

    /**
     * 스터디룸에서 가장 많이 쓰인 해시태그를 조회합니다.
     *
     * @param name 스터디룸 방 이름으로 검색 시 해당 검색 결과 내에서 가장 많이 쓰인 해시태그를 조회합니다.
     * @return 해시태그 이름 리스트
     */
    @GetMapping("/hashtags/popular")
    public ResponseEntity<GetPopularHashtagsResponse> getPopularHashtags(@RequestParam(required = false) String name) {
        GetPopularHashtagsResponse response = new GetPopularHashtagsResponse(hashtagService.findTop15Hashtags(name));
        return ResponseEntity.ok(response);
    }

    /**
     * [GET] /study-room : 스터디룸 리스트 조회 / 검색
     *
     * @param name     스터디룸 방 이름
     * @param hashtag 해시태그 이름
     * @param category 카테고리명
     * @param isPublic 공개방 여부
     * @param pageable 페이징
     * @return 검색 결과 스터디룸 리스트
     */
    @GetMapping("/study-rooms")
    public ResponseEntity<List<GetStudyRoomListEntityResponse>> get(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String hashtag,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Boolean isPublic,
            @PageableDefault(size = 16, sort = "createAt", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        List<StudyRoomDto> studyRooms;
        if (hashtag == null) {
            studyRooms = studyRoomSearchService.getStudyRoomsBySearchConditions(name, isPublic, category, pageable);
        } else {
            studyRooms = studyRoomSearchService.getStudyRoomsBySearchConditions(name, hashtag, isPublic, category, pageable);
        }
        return ResponseEntity.ok(studyRooms.stream().map(dtoMapper::toGetResponseList).collect(Collectors.toList()));
    }


}
