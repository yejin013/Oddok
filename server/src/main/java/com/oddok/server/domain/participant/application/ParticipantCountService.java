package com.oddok.server.domain.participant.application;

import com.oddok.server.domain.participant.dao.ParticipantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ParticipantCountService {

    private final ParticipantRepository participantRepository;

    public long getCountOfCurrentParticipant() {
        return participantRepository.count();
    }

}
