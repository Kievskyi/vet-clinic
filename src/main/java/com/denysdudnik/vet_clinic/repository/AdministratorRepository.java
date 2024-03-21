package com.denysdudnik.vet_clinic.repository;

import com.denysdudnik.vet_clinic.entity.Administrator;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdministratorRepository extends JpaRepository<Administrator, Integer> {

    Optional<Administrator> findByEmail(String email);
}
