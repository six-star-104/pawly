package com.pawly.domain.collection.dto;

import com.pawly.domain.collection.entity.Collection;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CollectionResponse {

    private Long collectionId;
    private String nickname;
    private String assets;

    public static CollectionResponse requestList(Collection collection) {
        return CollectionResponse.builder()
                .collectionId(collection.getCollectionId())
                .nickname(collection.getMemberId2().getNickname())
                .assets(collection.getMemberId2().getAssets())
                .build();
    }
}
