package com.denysdudnik.vet_clinic.repository;

import com.denysdudnik.vet_clinic.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor, Integer> {
    Optional<Doctor> findByEmail(String email);
}
