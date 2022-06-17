package com.oddok.server.common.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.oddok.server.common.errors.TokenValidFailedException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.io.DecodingException;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
//
//@Slf4j
//@RequiredArgsConstructor
//public class JwtAuthenticationFilter extends OncePerRequestFilter {
//
//    private final AuthTokenProvider tokenProvider;
//
//    @Override
//    protected void doFilterInternal(
//            HttpServletRequest request,
//            HttpServletResponse response,
//            FilterChain filterChain)  throws ServletException, IOException {
//
//        final String authorizationHeader = request.getHeader("Authorization");
//
//        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
//            String tokenStr = JwtHeaderUtil.getAccessToken(request);
//            AuthToken token = tokenProvider.convertAuthToken(tokenStr);
//
//            try {
//                if (token.validate()) {
//                    Authentication authentication = tokenProvider.getAuthentication(token);
//                    SecurityContextHolder.getContext().setAuthentication(authentication);
//                }
//
//                filterChain.doFilter(request, response);
//
//            } catch (SignatureException e) {
//                log.error("유효하지 않은 토큰입니다.");
//                throw new TokenValidFailedException();
//            } catch (MalformedJwtException e) {
//                log.error("손상된 토큰입니다.");
//                throw new TokenValidFailedException();
//            } catch (DecodingException e) {
//                log.error("잘못된 인증입니다.");
//                throw new TokenValidFailedException();
//            } catch (ExpiredJwtException e) {
//                log.error("만료된 토큰입니다.");
//                throw new TokenValidFailedException();
//            } catch (NullPointerException e) {
//                log.error("토큰이 없습니다." + tokenStr);
//                throw new TokenValidFailedException();
//            }
//        }
//    }
//}

/**
 * JWT 인증 필터
 *
 * @author always0ne
 * @version 1.0
 */
@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends GenericFilterBean {

    private final JwtTokenProvider jwtTokenProvider;
    private final ObjectMapper objectMapper;

    /**
     * JWT 토큰 검증
     * 만료된 토큰이 발견되었을 때, 만료된 토큰 응답 발생
     *
     * @param request     SubletRequest
     * @param response    SubletResponse
     * @param filterChain FilterChain
     */
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        try {
            Claims claims = jwtTokenProvider.resolveToken((HttpServletRequest) request);
            if (claims != null)
                SecurityContextHolder.getContext().setAuthentication(jwtTokenProvider.getAuthentication(claims));
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