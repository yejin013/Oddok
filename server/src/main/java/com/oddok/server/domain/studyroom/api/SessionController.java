package com.oddok.server.domain.studyroom.api;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.servlet.http.HttpSession;

import com.oddok.server.domain.studyroom.api.request.GetTokenRequest;
import com.oddok.server.domain.studyroom.api.response.TokenResponse;
import com.oddok.server.domain.studyroom.application.SessionService;
import com.oddok.server.domain.studyroom.dao.StudyRoomRepository;
import com.oddok.server.domain.studyroom.dto.CheckMasterDto;
import com.oddok.server.domain.studyroom.entity.StudyRoom;
import com.oddok.server.domain.user.dao.UserRepository;
import com.oddok.server.domain.user.entity.User;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.OpenViduRole;
import io.openvidu.java.client.Session;
import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.ConnectionType;

@RestController
@RequestMapping("/api/study-room")
public class SessionController {

    @Autowired
    SessionService sessionService;

    // OpenVidu object as entrypoint of the SDK
    private OpenVidu openVidu;

    // Collection to pair session names and OpenVidu Session objects
    private Map<String, Session> mapSessions = new ConcurrentHashMap<>();
    // Collection to pair session names and tokens (the inner Map pairs tokens and
    // role associated)
    private Map<String, Map<String, OpenViduRole>> mapSessionNamesTokens = new ConcurrentHashMap<>();

    // URL where our OpenVidu server is listening
    private String OPENVIDU_URL;
    // Secret shared with our OpenVidu server
    private String SECRET;

    public SessionController(@Value("${openvidu.secret}") String secret, @Value("${openvidu.url}") String openviduUrl) {
        this.SECRET = secret;
        this.OPENVIDU_URL = openviduUrl;
        this.openVidu = new OpenVidu(OPENVIDU_URL, SECRET);

    }

    /* 로그인 구현 후 삭제할 코드 */
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private StudyRoomRepository studyRoomRepository;

    @GetMapping(value = "/create")
    public void createBasic() {
        User maker1 = new User("maker@kakao.com");

        studyRoomRepository.save(new StudyRoom("study-room1", maker1));

        userRepository.save(maker1);
        userRepository.save(new User("user1@kakao.com"));
        userRepository.save(new User("user2@kakao.com"));
    }
    /* end */

    @PostMapping(value = "/{study-room-id}")
    public TokenResponse getToken(@PathVariable("study-room-id") String studyRoomId, @RequestBody GetTokenRequest getTokenRequest)
            throws Exception {

        OpenViduRole role;

        // Role associated to this user
        if (getTokenRequest.getIsMaster()) {
            if (!sessionService.checkMaster(new CheckMasterDto(
                    Long.parseLong(studyRoomId),
                    getTokenRequest.getUser())).getCorrect())
                return new TokenResponse(HttpStatus.BAD_REQUEST, null);
            else role = OpenViduRole.MODERATOR;
        } else role = OpenViduRole.PUBLISHER;

        // Optional data to be passed to other users when this user connects to the
        // video-call. In this case, a JSON with the value we stored in the HttpSession
        // object on login
        String serverData = "{\"serverData\": \"" + getTokenRequest.getUser() + "\"}";

        // Build connectionProperties object with the serverData and the role
        ConnectionProperties connectionProperties = new ConnectionProperties.Builder().type(ConnectionType.WEBRTC).data(serverData).role(role).build();

        if (this.mapSessions.get(studyRoomId) != null) {
            // Session already exists
            System.out.println("Existing session " + studyRoomId);
            try {

                // Generate a new Connection with the recently created connectionProperties
                String token = this.mapSessions.get(studyRoomId).createConnection(connectionProperties).getToken();

                // Update our collection storing the new token
                this.mapSessionNamesTokens.get(studyRoomId).put(token, role);

                // Return the response to the client
                return new TokenResponse(HttpStatus.OK, token);
            } catch (OpenViduJavaClientException e1) {
                // If internal error generate an error message and return it to client
                throw new Exception("OpenViduJavaClientException");
            } catch (OpenViduHttpException e2) {
                if (404 == e2.getStatus()) {
                    // Invalid sessionId (user left unexpectedly). Session object is not valid
                    // anymore. Clean collections and continue as new session
                    this.mapSessions.remove(studyRoomId);
                    this.mapSessionNamesTokens.remove(studyRoomId);
                }
            }
        }

        // New session
        System.out.println("New session " + studyRoomId);
        try {

            // Create a new OpenVidu Session
            Session session = this.openVidu.createSession();
            // Generate a new Connection with the recently created connectionProperties
            String token = session.createConnection(connectionProperties).getToken();

            // Store the session and the token in our collections
            this.mapSessions.put(studyRoomId, session);
            this.mapSessionNamesTokens.put(studyRoomId, new ConcurrentHashMap<>());
            this.mapSessionNamesTokens.get(studyRoomId).put(token, role);

            // Prepare the response with the token
            return new TokenResponse(HttpStatus.OK, token);

        } catch (Exception e) {
            // If error generate an error message and return it to client
            throw new Exception("FailedCreatingSessionException");
        }
    }

    @RequestMapping(value = "/remove-user", method = RequestMethod.POST)
    public ResponseEntity<JSONObject> removeUser(@RequestBody String sessionNameToken, HttpSession httpSession)
            throws Exception {

        try {
            checkUserLogged(httpSession);
        } catch (Exception e) {
            throw new Exception(e);
        }
        System.out.println("Removing user | {sessionName, token}=" + sessionNameToken);

        // Retrieve the params from BODY
        JSONObject sessionNameTokenJSON = (JSONObject) new JSONParser().parse(sessionNameToken);
        String sessionName = (String) sessionNameTokenJSON.get("sessionName");
        String token = (String) sessionNameTokenJSON.get("token");

        // If the session exists
        if (this.mapSessions.get(sessionName) != null && this.mapSessionNamesTokens.get(sessionName) != null) {

            // If the token exists
            if (this.mapSessionNamesTokens.get(sessionName).remove(token) != null) {
                // User left the session
                if (this.mapSessionNamesTokens.get(sessionName).isEmpty()) {
                    // Last user left: session must be removed
                    this.mapSessions.remove(sessionName);
                }
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                // The TOKEN wasn't valid
                System.out.println("Problems in the app server: the TOKEN wasn't valid");
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }

        } else {
            // The SESSION does not exist
            System.out.println("Problems in the app server: the SESSION does not exist");
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    private void checkUserLogged(HttpSession httpSession) throws Exception {
        if (httpSession == null || httpSession.getAttribute("loggedUser") == null) {
            throw new Exception("User not logged");
        }
    }

}