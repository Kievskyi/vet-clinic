package com.denysdudnik.vet_clinic.repository;

import com.denysdudnik.vet_clinic.entity.Clinic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClinicRepository extends JpaRepository<Clinic, Integer> {

    Optional<Clinic> findByName(String name);
}
