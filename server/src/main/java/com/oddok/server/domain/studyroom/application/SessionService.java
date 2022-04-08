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
        Session session = null;
        try {
            session = openVidu.createSession(properties);
            System.out.println("💘 세션 생성 : " + session);
        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
            e.printStackTrace();
        }
        return Objects.requireNonNull(session).getSessionId();
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
        String token = "";
        try {
            token = session.createConnection(connectionProperties).getToken();
        } catch (OpenViduJavaClientException e1) {
            throw new OpenviduServerException(e1.getMessage(), e1.getCause());
        } catch (OpenViduHttpException e2) {
            if (404 == e2.getStatus()) { // 요청 직전에 방이 삭제 된 경우 세션이 삭제되었음을 알린다.
                throw new SessionNotFoundException(sessionId);
            } else {
                throw new OpenviduServerException(e2.getMessage(), e2.getCause());
            }
        }
        return token;
    }


    /**
     * SessionId 로 Session 객체를 가져옵니다.
     *
     * @param sessionId String
     * @return Session
     */
    public Session getSession(String sessionId) {
        return openVidu.getActiveSessions().stream().filter(session -> session.getSessionId().equals(sessionId))
                .findFirst()
                .orElseThrow(() -> new SessionNotFoundException(sessionId));
    }

}
