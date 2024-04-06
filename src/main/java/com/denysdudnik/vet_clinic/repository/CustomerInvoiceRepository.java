package com.denysdudnik.vet_clinic.repository;

import com.denysdudnik.vet_clinic.entity.CustomerInvoice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerInvoiceRepository extends JpaRepository<CustomerInvoice, Integer> {
}
