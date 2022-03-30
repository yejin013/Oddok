package com.oddok.server.common.mapper;

public interface GenericResponseMapper <D, E>{
    D toResponse(E e);

    E toDto(D d);
}