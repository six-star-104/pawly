package com.pawly.global.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class FileService {

    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucketName}")
    private String bucket;

    @Value("${cloud.aws.s3.path.asset}")
    private String ASSET_IMG_DIR;

    @Value("${cloud.aws.s3.path.letter}")
    private String LETTER_IMG_DIR;

    public String saveAsset(MultipartFile multipartFile) throws IOException {
        if(multipartFile.isEmpty()) {
            return null;
        }
        return upload(multipartFile, ASSET_IMG_DIR);
    }

    public String savePicture(MultipartFile multipartFile) throws IOException {
        if(multipartFile.isEmpty()) {
            return null;
        }
        return upload(multipartFile, LETTER_IMG_DIR);
    }


    private String upload(MultipartFile multipartFile, String dirName) throws IOException {
        String fileName = dirName + UUID.randomUUID()  + "_" +  UUID.randomUUID() + ".jpg";
        try (InputStream inputStream = multipartFile.getInputStream()) {
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(multipartFile.getSize());
            amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, metadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        }

        System.out.println(amazonS3.getUrl(bucket, fileName).toString());

        return amazonS3.getUrl(bucket, fileName).toString();
    }
}
