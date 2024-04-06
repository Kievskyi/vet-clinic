package com.denysdudnik.vet_clinic.repository;

import com.denysdudnik.vet_clinic.entity.PetService;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceRepository extends JpaRepository<PetService, Integer> {
}
