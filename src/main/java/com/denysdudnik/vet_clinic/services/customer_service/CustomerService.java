package com.denysdudnik.vet_clinic.services.customer_service;

import com.denysdudnik.vet_clinic.dto.*;
import com.denysdudnik.vet_clinic.entity.Customer;

public interface CustomerService {

    CustomerDto findById(Integer id);

    Customer findByEmail(String email);

    CustomerDto updateCustomerInfo(UserRequest userRequest, CustomerDto customer);

    Customer save(UserRequest userRequest);

    CustomerDto addNewAppointment(Integer customerId, Integer petId, Appointment appointment);

    UserResponse buildResponse(CustomerDto customer);

    UserResponse buildResponse(String token, CustomerDto customer);

}
