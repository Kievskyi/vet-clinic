package com.denysdudnik.vet_clinic.services.customer_service;

import com.denysdudnik.vet_clinic.dto.Appointment;
import com.denysdudnik.vet_clinic.dto.CustomerDto;
import com.denysdudnik.vet_clinic.dto.UserRequest;
import com.denysdudnik.vet_clinic.dto.UserResponse;
import com.denysdudnik.vet_clinic.entity.Customer;

public interface CustomerService {

    CustomerDto findById(Integer id);

    Customer save(UserRequest userRequest);

    CustomerDto addNewAppointment(Integer customerId, Integer petId, Appointment appointment);

    UserResponse buildResponse(CustomerDto customer);

    UserResponse buildResponse(String token, CustomerDto customer);
}
