package com.oddok.server.domain.studyroom.application;

import com.oddok.server.common.errors.OpenviduServerException;
import com.oddok.server.common.errors.SessionNotFoundException;
import io.openvidu.java.client.*;

import java.util.Objects;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class SessionService {

    private final String OPENVIDU_URL;
    private final String SECRET;
    private final OpenVidu openVidu;

    public SessionService(@Value("${openvidu.url}") String OPENVIDU_URL, @Value("${openvidu.secret}") String SECRET) {
        this.OPENVIDU_URL = OPENVIDU_URL;
        this.SECRET = SECRET;
        this.openVidu = new OpenVidu(OPENVIDU_URL, SECRET);
    }


    /**
     * OpenVidu에 새로운 Session 생성 후 SessionId 반환
     */
    public String createSession() {
        SessionProperties properties = new SessionProperties.Builder().build();
        try {
            Session session = openVidu.createSession(properties);
            System.out.println("💘 세션 생성 : " + session);
            return session.getSessionId();
        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
            e.printStackTrace();
            throw new OpenviduServerException(e.getMessage(), e.getCause());
        }
    }

    /**
     * OpenVidu Session 에 새로운 Connection 생성 후 token 반환
     *
     * @param sessionId String
     * @return token
     */
    public String getToken(String sessionId) {
        Session session = getSession(sessionId);
        ConnectionProperties connectionProperties = new ConnectionProperties.Builder()
                .type(ConnectionType.WEBRTC)
                .role(OpenViduRole.PUBLISHER)
                .build();
        try {
            String token = session.createConnection(connectionProperties).getToken();
            return token;
        } catch (OpenViduJavaClientException e1) {
            throw new OpenviduServerException(e1.getMessage(), e1.getCause());
        } catch (OpenViduHttpException e2) {
            if (404 == e2.getStatus()) { // 요청 직전에 방이 삭제 된 경우 세션이 삭제되었음을 알린다.
                throw new SessionNotFoundException(sessionId);
            } else {
                throw new OpenviduServerException(e2.getMessage(), e2.getCause());
            }
        }
    }


    /**
     * SessionId 로 Session 객체를 가져옵니다.
     *
     * @param sessionId String
     * @return Session
     */
    public Session getSession(String sessionId) {
        for (Session session : openVidu.getActiveSessions()) {
            if (session.getSessionId().equals(sessionId))
                return session;
        }
        throw new SessionNotFoundException(sessionId);
    }

    /**
     * SessionId 로 Session 을 삭제합니다.
     *
     * @param sessionId String
     * @return Session
     */
    public void deleteSession(String sessionId) {
        Session session = getSession(sessionId);
        try {
            session.close();
        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
            e.printStackTrace();
        }
    }

}
