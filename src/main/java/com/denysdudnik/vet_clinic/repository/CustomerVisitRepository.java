package com.denysdudnik.vet_clinic.repository;

import com.denysdudnik.vet_clinic.entity.CustomerVisit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerVisitRepository extends JpaRepository<CustomerVisit, Integer> {
}
