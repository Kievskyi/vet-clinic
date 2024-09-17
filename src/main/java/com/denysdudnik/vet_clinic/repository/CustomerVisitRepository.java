package com.denysdudnik.vet_clinic.repository;

import com.denysdudnik.vet_clinic.entity.CustomerVisit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerVisitRepository extends JpaRepository<CustomerVisit, Integer> {

    Optional<CustomerVisit> findById(Integer id);
}
