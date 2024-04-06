package com.denysdudnik.vet_clinic.services.customer_info_service;

import com.denysdudnik.vet_clinic.entity.CustomerInfo;

public interface CustomerInfoService {

    CustomerInfo save(CustomerInfo customerInfo);

    CustomerInfo findByEmail(String email);

    CustomerInfo findById(Integer id);
}
