package com.oddok.server.common.jwt;

import com.oddok.server.domain.user.entity.Auth;
import com.oddok.server.domain.user.entity.Role;
import com.oddok.server.domain.user.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.DecodingException;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

/**
 * JWT 토큰 처리기
 *
 * @author always0ne
 * @version 1.0
 */
@RequiredArgsConstructor
@Component
public class JwtTokenProvider {
    /**
     * Secret Key
     */
    @Value("${jwt.token.secret}")
    private String secretKey;
    /**
     * encrypted Secret Key
     */
    private Key key;
    /**
     * AccessToken 유효시간(10분)
     */
    @Value("${jwt.refresh-token.expire-length}")
    private String accessTokenValidMilSecond;
    /**
     * RefreshToken 유효시간(일주일)
     */
    @Value("${jwt.refresh-token.expire-length}")
    private String refreshTokenValidMilSecond;

    /**
     * SecretKey 암호화 하면서 초기화
     */
    @PostConstruct
    protected void init() {
        this.key = Keys.hmacShaKeyFor(this.secretKey.getBytes());
    }

    /**
     * AccessToken 생성
     *
     * @param id 발급할 사용자의 아이디
     * @param role  사용자에게 허용할 권한
     * @return AccessToken
     */
    public String createAccessToken(String id, String userId, Role role) {
        return generateToken(id, userId, role, Long.parseLong(accessTokenValidMilSecond));
    }

    /**
     * RefreshToken 생성
     *
     * @param userId 발급할 사용자의 아이디
     * @param role  사용자에게 허용할 권한
     * @return AccessToken
     */
    public String createRefreshToken(String id, String userId, Role role) {
        return generateToken(id, userId, role, Long.parseLong(refreshTokenValidMilSecond));
    }

    /**
     * JWTToken 생성
     *
     * @param id              발급할 사용자의 아이디
     * @param role               사용자에게 허용할 권한
     * @param tokenValidMilSecond 토큰 유효시간
     * @return AccessToken
     */
    protected String generateToken(String id, String userId, Role role, long tokenValidMilSecond) {
        Date now = new Date();
        return Jwts.builder()
                .claim("id", id)
                .claim("userId", userId)
                .claim("role", role)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + tokenValidMilSecond))
                .signWith(this.key, SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Http Request 에서 JWT 토큰의 데이터 추출
     * Authorization 헤더에 Bearer [Token] 형태로 되어야 함
     *
     * @param req Http 요청
     * @return 토큰 데이터
     */
    public Claims resolveToken(HttpServletRequest req) {
        String token = req.getHeader("Authorization");
        if (token == null)
            return null;
        else if (token.contains("Bearer"))
            token = token.replace("Bearer ", "");
        else
            throw new DecodingException("");

        return getClaimsFromToken(token);
    }

    /**
     * 토큰에서 토큰 데이터를 추출
     *
     * @param token JWT 토큰
     * @return 토큰 데이터
     */
    public Claims getClaimsFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * Spring Security 인증토큰 발급
     * accessToken 은 주기가 짧기 때문에 검사없이 허용한다.
     * 매번 DB에 검증 하기엔 OverHead 가 너무 큼
     *
     * @param claims JWT 토큰 데이터
     * @return Spring Security 인증토큰
     */
    public Authentication getAuthentication(Claims claims) {
        return new UsernamePasswordAuthenticationToken(new Auth(claims), "", getAuthorities(claims));
    }

    /**
     * JWT 토큰 데이터 에서 UserID 추출
     *
     * @param claims JWT 토큰 데이터
     * @return UserId
     */
    public String getUserId(Claims claims) {
        return (String) claims.get("id");
    }

    /**
     * JWT 토큰 데이터 Roles 추출
     *
     * @param claims JWT 토큰 데이터
     * @return 사용자 권한 정보
     */
    private Collection<? extends GrantedAuthority> getAuthorities(Claims claims) {
        return Arrays.stream(new String[]{claims.get("role").toString()})
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());
    }
}
