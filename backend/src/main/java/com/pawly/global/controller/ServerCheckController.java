package com.pawly.global.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ServerCheckController {

    @GetMapping("/api/server-check")
    public String serverCheck() {
        return "OK";
    }
}
