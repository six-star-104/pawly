package com.pawly.global.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import java.io.InputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.IOException;

@Service
public class FirebaseInitialization {

    @PostConstruct
    public void initialize() throws IOException {
        if (FirebaseApp.getApps().isEmpty()) { // FirebaseApp이 존재하지 않을 때만 초기화
            String firebaseConfigPath = "firebase-service-account.json";

            // 리소스를 InputStream으로 읽기
            InputStream serviceAccount = getClass().getClassLoader().getResourceAsStream(firebaseConfigPath);
            if (serviceAccount == null) {
                throw new IOException("Firebase configuration file not found: " + firebaseConfigPath);
            }

            FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();

            FirebaseApp.initializeApp(options);
        }
    }
}
