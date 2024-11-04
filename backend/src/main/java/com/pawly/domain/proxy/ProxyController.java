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

    @Value("${deepl.api-key}")
    private String depplApiKey;

    @Value("${dall-e.api-key}")
    private String dalleApiKey;

    @GetMapping()
    public ApiResponse<?> getTranslation(@RequestParam String word) {
        try {
            String translateUrl = "https://api-free.deepl.com/v2/translate";

            // 요청 헤더 설정
            HttpHeaders translateHeaders = new HttpHeaders();
            translateHeaders.setContentType(MediaType.APPLICATION_JSON);
            translateHeaders.set("Authorization", "DeepL-Auth-Key " + depplApiKey);

            // 요청 본문 설정
            Map<String, Object> translateBody = new HashMap<>();
            translateBody.put("text", new String[]{word});
            translateBody.put("target_lang", "EN");
            translateBody.put("source_lang", "KO");

            HttpEntity<Map<String, Object>> translateRequestEntity = new HttpEntity<>(translateBody, translateHeaders);

            // 요청 보내기
            ResponseEntity<String> translateResponse = restTemplate.exchange(translateUrl, HttpMethod.POST,
                translateRequestEntity, String.class);

            // 응답 본문에서 text 값 추출
            JsonNode jsonNode = objectMapper.readTree(translateResponse.getBody());
            String translatedText = jsonNode.at("/translations/0/text").asText();

            // dall-e-3로 이미지 생성
            String generateImageUrl = "https://api.openai.com/v1/images/generations";

            // 요청 헤더 설정
            HttpHeaders generateHeader = new HttpHeaders();
            generateHeader.setContentType(MediaType.APPLICATION_JSON);
            generateHeader.set("Authorization", "Bearer " + dalleApiKey);

            HttpEntity<Map<String, Object>> generateRequestEntity = getMapHttpEntity(
                translatedText, generateHeader);

            // 요청 보내기
            ResponseEntity<String> generateResponse = restTemplate.exchange(generateImageUrl, HttpMethod.POST,
                generateRequestEntity, String.class);

            JsonNode generatejsonNode = objectMapper.readTree(generateResponse.getBody());
            String imageUrl = generatejsonNode.at("/data/0/url").asText();

            // 응답 확인 후 ApiResponse로 반환
            return ApiResponse.createSuccess(imageUrl, "이미지 생성 성공");

        } catch (Exception e) {
            System.out.println("Error during translation: " + e.getMessage());
            return ApiResponse.createError(ErrorCode.PROXY_TRANSLATE_FAILED);
        }
    }

    private static HttpEntity<Map<String, Object>> getMapHttpEntity(String translatedText,
        HttpHeaders generateHeader) {
        Map<String, Object> generateBody = new HashMap<>();

        generateBody.put("model", "dall-e-3");
        generateBody.put("prompt", "please create a simple pixel art image of a cute " + translatedText
            + " in animation style, with a white background. "
            + "Ensure that the image includes only the " + translatedText + " and no other elements or background.");
        generateBody.put("n", 1);
        generateBody.put("size", "1024x1024");
        generateBody.put("quality", "hd");

        HttpEntity<Map<String, Object>> generateRequestEntity = new HttpEntity<>(generateBody,
            generateHeader);
        return generateRequestEntity;
    }
}
