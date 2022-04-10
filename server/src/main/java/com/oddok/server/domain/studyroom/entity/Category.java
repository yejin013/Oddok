package com.oddok.server.domain.studyroom.entity;

public enum Category {
    OFFICIAL("공무원"), SCHOOL("수능/내신"), CERTIFICATE("자격증"),
    EMPLOYEE("취업"), ETC("개인");

    private final String value;

    Category(String value) {
        this.value = value;
    }

    public String getValue() { return value; }
}