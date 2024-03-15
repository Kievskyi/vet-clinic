package com.denysdudnik.vet_clinic.repository;

import com.denysdudnik.vet_clinic.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository extends JpaRepository<Doctor, Integer> {
}
