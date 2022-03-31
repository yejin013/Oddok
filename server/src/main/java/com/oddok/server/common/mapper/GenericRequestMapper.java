package com.oddok.server.common.mapper;

public interface GenericRequestMapper <R, D>{
    D toDto(R request);
}