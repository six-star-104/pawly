package com.pawly.domain.postbox.service;

import com.pawly.domain.member.repository.MemberRepository;
import com.pawly.domain.postbox.dto.PostboxCreateDto;
import com.pawly.domain.postbox.entity.Postbox;
import com.pawly.domain.postbox.repository.PostboxRepository;
import com.pawly.domain.rollingPaper.repository.RollingPaperRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

@Service
@AllArgsConstructor
public class PostboxService {
    private final PostboxRepository postboxRepository;
    private final RollingPaperRepository rollingPaperRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public boolean createPostbox(PostboxCreateDto dto){
        try {
            Postbox postbox = postboxRepository.save(dto.toEntity());
            return true;
        } catch (Exception e){
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            return false;
        }
    }

//    @Transactional
//    public boolean postboxArRead(PostboxReadRequest request) {
//
//    }
}
