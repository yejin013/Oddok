package com.oddok.server.common.mapper;

public interface GenericRequestMapper <D, E>{
    D toRequest(E e);

    E toDto(D d);
}