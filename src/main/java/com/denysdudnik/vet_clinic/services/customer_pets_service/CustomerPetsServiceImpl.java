package com.denysdudnik.vet_clinic.services.customer_pets_service;

import com.denysdudnik.vet_clinic.dto.CustomerDto;
import com.denysdudnik.vet_clinic.dto.PetDto;
import com.denysdudnik.vet_clinic.entity.Customer;
import com.denysdudnik.vet_clinic.entity.CustomerPet;
import com.denysdudnik.vet_clinic.mappers.CustomerMapper;
import com.denysdudnik.vet_clinic.repository.CustomerPetsRepository;
import com.denysdudnik.vet_clinic.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerPetsServiceImpl implements CustomerPetsService {
    private final CustomerPetsRepository petsRepository;
    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper;

    @Override
    public List<CustomerPet> getPetsByCustomerId(Integer customerId) {
        return petsRepository.findByCustomerId(customerId).orElseThrow(() -> new IllegalArgumentException("Pets not found"));
    }

    @Override
    @Transactional
    public CustomerDto deletePetById(Integer customerId, Integer petId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        CustomerPet petToRemove = customer.getCustomerPets().stream()
                .filter(pet -> pet.getId().equals(petId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Pet not found"));

        customer.getCustomerPets().remove(petToRemove);
        customerRepository.save(customer);

        return customerMapper.customerToCustomerDto(customer);
    }

    @Override
    public CustomerDto addNewPet(Integer customerId, PetDto newPet) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        CustomerPet customerPet = CustomerPet.builder()
                .customer(customer)
                .breed(newPet.getBreed())
                .type(newPet.getType())
                .name(newPet.getName())
                .birthDate(newPet.getBirthDate())
                .build();
        customer.getCustomerPets().add(customerPet);

        return customerMapper.customerToCustomerDto(customerRepository.save(customer));
    }
}
