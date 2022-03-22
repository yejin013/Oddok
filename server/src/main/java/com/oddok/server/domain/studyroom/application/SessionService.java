package com.oddok.server.domain.studyroom.application;

import com.oddok.server.common.errors.OpenviduServerException;
import com.oddok.server.common.errors.SessionNotFoundException;
import com.oddok.server.domain.studyroom.dao.StudyRoomRepository;
import io.openvidu.java.client.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class SessionService {

    private StudyRoomRepository studyRoomRepository;

    private String OPENVIDU_URL;
    private String SECRET;
    private OpenVidu openVidu;

    public SessionService(StudyRoomRepository studyRoomRepository, @Value("${openvidu.url}") String OPENVIDU_URL, @Value("${openvidu.secret}") String SECRET) {
        this.studyRoomRepository = studyRoomRepository;
        this.OPENVIDU_URL = OPENVIDU_URL;
        this.SECRET = SECRET;
        this.openVidu = new OpenVidu(OPENVIDU_URL, SECRET);
    }


    /**
     * OpenVidu에 새로운 Session 생성 후 SessionId 반환
     * @return SessionId
     * @throws OpenViduJavaClientException
     * @throws OpenViduHttpException
     */
    public String createSession() throws OpenViduJavaClientException, OpenViduHttpException {
        SessionProperties properties = new SessionProperties.Builder().build();
        Session session = openVidu.createSession(properties);
        System.out.println("💘 세션 생성 : " + session);
        return session.getSessionId();
    }

    /**
     * OpenVidu Session 에 새로운 Connection 생성 후 token 반환
     * @param sessionId
     * @param role
     * @return token
     */
    public String getToken(String sessionId, OpenViduRole role) {
        Session session = getSession(sessionId);
        ConnectionProperties connectionProperties = new ConnectionProperties.Builder()
                .type(ConnectionType.WEBRTC)
                .role(role)
                .build();
        String token = "";
        try {
            token = session.createConnection(connectionProperties).getToken();
        } catch (OpenViduJavaClientException e1) {
            throw new OpenviduServerException(e1.getMessage(), e1.getCause());
        } catch (OpenViduHttpException e2) {
            if (404 == e2.getStatus()) {
                throw new SessionNotFoundException(sessionId);
            } else {
                throw new OpenviduServerException(e2.getMessage(), e2.getCause());
            }
        }
        return token;
    }

    /**
     * SessionId 로 Session 객체를 가져옵니다.
     * @param sessionId
     * @return Session
     */
    public Session getSession(String sessionId) {
        return openVidu.getActiveSessions().stream().filter(session -> session.getSessionId().equals(sessionId))
                .findFirst()
                .orElseThrow(() -> new SessionNotFoundException(sessionId));
    }

}
