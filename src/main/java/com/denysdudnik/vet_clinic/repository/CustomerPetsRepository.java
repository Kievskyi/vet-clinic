package com.denysdudnik.vet_clinic.repository;

import com.denysdudnik.vet_clinic.entity.CustomerPet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CustomerPetsRepository extends JpaRepository<CustomerPet, Integer> {
    Optional<List<CustomerPet>> findByCustomerId(Integer id);
}
