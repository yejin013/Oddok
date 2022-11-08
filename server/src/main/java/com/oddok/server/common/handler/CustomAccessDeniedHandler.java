package com.oddok.server.common.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.oddok.server.common.ErrorResponse;
import com.oddok.server.common.errors.AccessTokenException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;

@Component
@Slf4j
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

    ErrorResponse errorResponse = new ErrorResponse(new AccessTokenException().getMessage());

    @Override
    public void handle(HttpServletRequest httpServletRequest,
                       HttpServletResponse httpServletResponse,
                       AccessDeniedException e) throws IOException {

        log.error("접근 권한이 없습니다.");

        httpServletResponse.setContentType(MediaType.APPLICATION_JSON_VALUE);
        httpServletResponse.setStatus(HttpStatus.FORBIDDEN.value());
        try (OutputStream os = httpServletResponse.getOutputStream()) {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.writeValue(os, errorResponse);
            os.flush();
        }
    }
}
