package com.denysdudnik.vet_clinic.repository;

import com.denysdudnik.vet_clinic.entity.CustomerInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerInfoRepository extends JpaRepository<CustomerInfo, Integer> {

    Optional<CustomerInfo> findByCustomerId(Integer id);
}
