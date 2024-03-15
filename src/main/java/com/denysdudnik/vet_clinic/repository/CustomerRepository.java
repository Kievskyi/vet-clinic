package com.denysdudnik.vet_clinic.repository;

import com.denysdudnik.vet_clinic.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
}
