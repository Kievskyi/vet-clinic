package com.denysdudnik.vet_clinic.repository;

import com.denysdudnik.vet_clinic.entity.Administrator;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdministratorRepository extends JpaRepository<Administrator, Integer> {
}
