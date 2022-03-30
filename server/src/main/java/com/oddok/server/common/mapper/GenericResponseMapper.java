package com.oddok.server.common.mapper;

public interface GenericResponseMapper <R, D>{
    R toResponse(D dto);
}