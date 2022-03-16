package com.oddok.server.domain.studyroom.application;

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
     * OpenVidu Session 에 새로운 Session 생성 후 SessionId 반환
     * @return SessionId
     * @throws OpenViduJavaClientException
     * @throws OpenViduHttpException
     */
    public String createSession() throws OpenViduJavaClientException, OpenViduHttpException {
        SessionProperties properties = new SessionProperties.Builder().build();
        Session session = openVidu.createSession(properties);
        System.out.println("💘 세션 생성 : "+session);
        return session.getSessionId();
    }


    /*
    public String getToken(Session session, String id) throws OpenViduJavaClientException, OpenViduHttpException {
        // TODO: 방장 여부 확인. 현재는 방장 아닐때만!
        // TODO: ConnectionProperties 가 사라진것같은데..
        ConnectionProperties connectionProperties = new ConnectionProperties.Builder()
                .type(ConnectionType.WEBRTC)
                .role(OpenViduRole.PUBLISHER)
                .data("user_data")
                .build();
        Connection connection = session.createConnection(connectionProperties);
        String token = connection.getToken(); // Send this string to the client side
        OpenViduRole role = OpenViduRole.PUBLISHER;
        ConnectionProperties connectionProperties = new ConnectionProperties.Builder().type(ConnectionType.WEBRTC).role(OpenViduRole.PUBLISHER).build();

        try {
            // 새로운 토큰을 생성
            String token = session.createConnection(connectionProperties).getToken();
        } catch (OpenViduJavaClientException e1) {
            System.out.println("OpenViduJavaClient 서버 내부 에러");
        } catch (OpenViduHttpException e2) {
            if (404 == e2.getStatus()) {
                // 유효하지 않은 세션 id(예기치못하게 방이 삭제되었을 경우) 방 삭제
                this.mapStudyRoomNameSession.remove(id); // DB 에서 해당 StudyRoom 삭제
                this.mapSessionIdTokens.remove(session.getSessionId()); // 해당 StudyRoom에 대한 참여자 목록 삭제
            }
        }
        String token = session.createConnection(connectionProperties).getToken();
        return token;
    }

     */


}
