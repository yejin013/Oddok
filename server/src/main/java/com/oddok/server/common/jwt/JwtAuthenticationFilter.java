package com.oddok.server.common.jwt;

import com.oddok.server.common.errors.TokenValidFailedException;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.io.DecodingException;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final AuthTokenProvider tokenProvider;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)  throws ServletException, IOException {

        final String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String tokenStr = JwtHeaderUtil.getAccessToken(request);
            AuthToken token = tokenProvider.convertAuthToken(tokenStr);

            try {
                if (token.validate()) {
                    Authentication authentication = tokenProvider.getAuthentication(token);
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }

                filterChain.doFilter(request, response);

            } catch (SignatureException e) {
                log.error("유효하지 않은 토큰입니다.");
                throw new TokenValidFailedException();
            } catch (MalformedJwtException e) {
                log.error("손상된 토큰입니다.");
                throw new TokenValidFailedException();
            } catch (DecodingException e) {
                log.error("잘못된 인증입니다.");
                throw new TokenValidFailedException();
            } catch (ExpiredJwtException e) {
                log.error("만료된 토큰입니다.");
                throw new TokenValidFailedException();
            }
        }
    }
}