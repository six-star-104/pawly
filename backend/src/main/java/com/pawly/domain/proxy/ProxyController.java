package com.pawly.domain.proxy;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pawly.global.exception.ErrorCode;
import com.pawly.global.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/proxy")
public class ProxyController {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public ProxyController() {
        this.restTemplate = new RestTemplate();
    }

    @Value("${deepl.api_key}")
    private String apiKey;

    @GetMapping()
    public ApiResponse<?> getTranslation(@RequestParam String word) {
        try {
            String url = "https://api-free.deepl.com/v2/translate";

            // 요청 헤더 설정
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization", "DeepL-Auth-Key " + apiKey);

            // 요청 본문 설정
            Map<String, Object> body = new HashMap<>();
            body.put("text", new String[]{word});
            body.put("target_lang", "EN");
            body.put("source_lang", "KO");

            HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(body, headers);

            // 요청 보내기
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);

            // 응답 본문에서 text 값 추출
            JsonNode jsonNode = objectMapper.readTree(response.getBody());
            String translatedText = jsonNode.at("/translations/0/text").asText();

            // 응답 확인 후 ApiResponse로 반환
            return ApiResponse.createSuccess(translatedText, "번역 성공");

        } catch (Exception e) {
            System.out.println("Error during translation: " + e.getMessage());
            return ApiResponse.createError(ErrorCode.PROXY_TRANSLATE_FAILED);
        }
    }
}
