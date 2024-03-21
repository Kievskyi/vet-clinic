package com.denysdudnik.vet_clinic.services.customer_pets_service;

import com.denysdudnik.vet_clinic.entity.CustomerPet;
import com.denysdudnik.vet_clinic.repository.CustomerPetsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerPetsServiceImpl implements CustomerPetsService {
    private final CustomerPetsRepository petsRepository;

    @Override
    public List<CustomerPet> getPetsByCustomerId(Integer customerId) {
        return petsRepository.findByCustomerId(customerId).orElseThrow(() -> new IllegalArgumentException("Pets not found"));
    }

    @Override
    @Transactional
    public List<CustomerPet> deletePetById(CustomerPet customerPet) {
        petsRepository.delete(customerPet);
        return petsRepository.findByCustomerId(customerPet.getCustomer().getId()).orElseThrow(() -> new IllegalArgumentException("Pets not found"));
    }
}
