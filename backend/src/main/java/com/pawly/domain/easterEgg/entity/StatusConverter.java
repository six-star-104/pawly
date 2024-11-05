package com.pawly.domain.easterEgg.entity;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class StatusConverter implements AttributeConverter<Status, String> {

    @Override
    public String convertToDatabaseColumn(Status status) {
        if (status == null) {
            return null;
        }
        return status.getMessage(); // DB에 저장될 때는 message 값을 저장
    }

    @Override
    public Status convertToEntityAttribute(String dbData) {
        if (dbData == null) {
            return null;
        }

        // message 값에 맞는 Status enum을 반환
        return switch (dbData) {
            case "진행중" -> Status.IN_PROGRESS;
            case "완료됨" -> Status.COMPLETE;
            case "완료하기" -> Status.ACHIEVED;
            default -> throw new IllegalArgumentException("Unknown status: " + dbData);
        };
    }
}
