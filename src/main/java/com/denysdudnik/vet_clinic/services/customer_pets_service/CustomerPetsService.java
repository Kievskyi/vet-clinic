package com.denysdudnik.vet_clinic.services.customer_pets_service;

import com.denysdudnik.vet_clinic.entity.CustomerPet;

import java.util.List;

public interface CustomerPetsService {

    List<CustomerPet> getPetsByCustomerId(Integer customerId);

    List<CustomerPet> deletePetById(CustomerPet customerPet);
}
