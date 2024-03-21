package com.denysdudnik.vet_clinic.services.customer_service;

import com.denysdudnik.vet_clinic.dto.CustomerDto;
import com.denysdudnik.vet_clinic.dto.UserRequest;
import com.denysdudnik.vet_clinic.dto.CustomerResponse;
import com.denysdudnik.vet_clinic.entity.Customer;

public interface CustomerService {

    CustomerDto findById(Integer id);

    Customer findByEmail(String email);

    CustomerDto updateCustomerInfo(UserRequest userRequest, CustomerDto customer);

    Customer save(UserRequest userRequest);

    CustomerResponse buildResponse(CustomerDto customer);

    CustomerResponse buildResponse(String token, CustomerDto customer);
}
