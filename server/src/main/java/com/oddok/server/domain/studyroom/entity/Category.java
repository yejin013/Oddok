package com.oddok.server.domain.studyroom.entity;

public enum Category {
    OFFICIAL("공시생"), SCHOOL("대입"), CERTIFICATE("자격증"),
    EMPLOYEE("취준생"), ETC("개인학습");

    private final String value;

    Category(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
