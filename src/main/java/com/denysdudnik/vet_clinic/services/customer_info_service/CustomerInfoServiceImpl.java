package com.denysdudnik.vet_clinic.services.customer_info_service;

import com.denysdudnik.vet_clinic.entity.CustomerInfo;
import com.denysdudnik.vet_clinic.repository.CustomerInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomerInfoServiceImpl implements CustomerInfoService {
    private final CustomerInfoRepository customerInfoRepository;

    @Override
    public CustomerInfo save(CustomerInfo customerInfo) {
        return customerInfoRepository.save(customerInfo);
    }

    @Override
    public CustomerInfo findById(Integer id) {
        return customerInfoRepository.findByCustomerId(id).orElseThrow(() -> new IllegalArgumentException("Invalid customer id"));
    }
}
