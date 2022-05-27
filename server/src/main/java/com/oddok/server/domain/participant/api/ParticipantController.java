package com.oddok.server.domain.participant.api;

import com.oddok.server.domain.participant.application.ParticipantCountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/participant")
@RequiredArgsConstructor
public class ParticipantController {

    private final ParticipantCountService participantCountService;

    /**
     * 현재 스터디룸에 참여하여 공부중인 인원을 조회합니다.
     * @return long 형의 현재 공부중인 인원
     */
    @GetMapping("/count")
    public ResponseEntity<Long> getCountOfParticipant() {
        return ResponseEntity.ok(participantCountService.getCountOfCurrentParticipant());
    }

}
