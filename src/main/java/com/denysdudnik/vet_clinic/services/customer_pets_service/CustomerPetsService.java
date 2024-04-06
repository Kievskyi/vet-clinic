package com.denysdudnik.vet_clinic.services.customer_pets_service;

import com.denysdudnik.vet_clinic.dto.CustomerDto;
import com.denysdudnik.vet_clinic.dto.PetDto;
import com.denysdudnik.vet_clinic.entity.CustomerPet;

import java.util.List;

public interface CustomerPetsService {

    List<CustomerPet> getPetsByCustomerId(Integer customerId);

    CustomerDto deletePetById(Integer customerId, Integer petId);

    CustomerDto addNewPet(Integer customerId, PetDto newPet);
}
