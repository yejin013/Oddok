package com.oddok.server.domain.studyroom.entity;

public enum Category {
    OFFICIAL("공시생"), SCHOOL("대입"), CERTIFICATE("자격증"),
    EMPLOYEE("취준생"), PERSONAL("개인학습"), ETC("일반");

    private final String value;

    Category(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
