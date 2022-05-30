package com.oddok.server.common.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.oddok.server.common.jwt.JwtAuthenticationFilter;
import com.oddok.server.common.jwt.JwtTokenProvider;
import com.oddok.server.domain.user.entity.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtTokenProvider jwtTokenProvider;
    private final ObjectMapper objectMapper;

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        // TODO: ROLE 지정
        http.httpBasic().disable()
                .authorizeRequests()
                .antMatchers(HttpMethod.GET, "/auth").permitAll()
                .antMatchers(HttpMethod.GET, "/study-room").permitAll()
                .anyRequest().authenticated()
                .and()
                .headers()
                .frameOptions().disable()
                .and()
                .cors()
                .and()
                .csrf().disable()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider, objectMapper), UsernamePasswordAuthenticationFilter.class)
        ;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
