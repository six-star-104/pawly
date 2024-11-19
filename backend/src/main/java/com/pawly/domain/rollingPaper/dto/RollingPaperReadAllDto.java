package com.pawly.domain.rollingPaper.dto;

import com.pawly.domain.rollingPaper.entity.RollingPaper;
import com.pawly.domain.rollingPaper.enums.Status;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RollingPaperReadAllDto {
    private Long ownerMemberId;
    private String ownerMemberNickname;
    private String rollingPaperTitle;
    private Status status;
    private Object content;
    private int pageNumber;
    private int pageSize;
    private Long totalPage;
    private Long totalElements;

    public static RollingPaperReadAllDto toDto(Object content, RollingPaper rollingPaper, int pageNumber, int pageSize, Long totalPage, Long totalElements) {
        return RollingPaperReadAllDto.builder()
                .ownerMemberId(rollingPaper.getMember().getMemberId())
                .ownerMemberNickname(rollingPaper.getMember().getNickname())
                .rollingPaperTitle(rollingPaper.getTitle())
                .status(rollingPaper.getStatus())
                .content(content)
                .pageNumber(pageNumber)
                .pageSize(pageSize)
                .totalPage(totalPage)
                .totalElements(totalElements)
                .build();
    }
}
