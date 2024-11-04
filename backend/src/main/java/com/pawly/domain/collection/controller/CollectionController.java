package com.pawly.domain.collection.controller;

import com.pawly.domain.collection.service.CollectionService;
import com.pawly.global.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/collection")
public class CollectionController {

    private final CollectionService collectionService;

    @GetMapping("/{memberId}")
    public ApiResponse<?> readCollection(@PathVariable("memberId") Long memberId) {
        return collectionService.collectionList(memberId);
    }
}
