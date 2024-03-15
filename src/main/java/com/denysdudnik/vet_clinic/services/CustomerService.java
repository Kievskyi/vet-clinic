package com.denysdudnik.vet_clinic.services;

import com.denysdudnik.vet_clinic.entity.Customer;

public interface CustomerService {

    Customer findById(int id);
}
