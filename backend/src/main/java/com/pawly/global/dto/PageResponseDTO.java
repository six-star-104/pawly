package com.pawly.global.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class PageResponseDTO {

    Object content;
    Integer pageNumber;
    Integer pageSize;
    Long totalPage;
    Long totalElements;

    public static PageResponseDTO toDTO(Object content, Integer pageNumber, Integer pageSize,
        Long totalPage, Long totalElements) {
        return PageResponseDTO.builder()
            .content(content)
            .pageNumber(pageNumber)
            .pageSize(pageSize)
            .totalPage(totalPage)
            .totalElements(totalElements)
            .build();
    }
}