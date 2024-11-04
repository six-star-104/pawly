package com.pawly.domain.collection.controller;

import com.pawly.domain.collection.service.CollectionService;
import com.pawly.global.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/collection")
public class CollectionController {

    private final CollectionService collectionService;

    @GetMapping("/{memberId}")
    public ApiResponse<?> readCollection(@PathVariable("memberId") Long memberId,
                                            @RequestParam(name = "pageNumber", defaultValue = "0") int pageNumber,
                                            @RequestParam(name = "pageSize", defaultValue = "10") int pageSize,
                                            @RequestParam(name = "sortType", defaultValue = "desc") String sortType,
                                            @RequestParam(name = "sortBy", required = false, defaultValue = "createdAt") String sortBy) {

        return collectionService.collectionList(memberId, pageNumber, pageSize, sortType, sortBy);
    }
}
