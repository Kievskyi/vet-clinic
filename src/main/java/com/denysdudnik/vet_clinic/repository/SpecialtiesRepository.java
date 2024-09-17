package com.denysdudnik.vet_clinic.repository;

import com.denysdudnik.vet_clinic.entity.Specialty;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SpecialtiesRepository extends JpaRepository<Specialty, Integer> {

    Optional<Specialty> findByDescription(String description);
}
