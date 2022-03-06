package com.oddok.server.domain.studyroom.api.request;

import lombok.Getter;

@Getter
public class GetTokenRequest {
    String user;
    Boolean isMaster;
}
