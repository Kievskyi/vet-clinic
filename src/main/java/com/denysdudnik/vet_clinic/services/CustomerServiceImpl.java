package com.denysdudnik.vet_clinic.services;

import com.denysdudnik.vet_clinic.entity.Customer;
import com.denysdudnik.vet_clinic.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {
    private final CustomerRepository customerRepository;

    public Customer findById(int id) {
        return customerRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
}
