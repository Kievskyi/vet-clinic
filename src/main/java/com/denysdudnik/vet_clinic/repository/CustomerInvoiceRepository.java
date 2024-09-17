package com.denysdudnik.vet_clinic.repository;

import com.denysdudnik.vet_clinic.entity.CustomerInvoice;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomerInvoiceRepository extends JpaRepository<CustomerInvoice, Integer> {

    @EntityGraph(attributePaths = {"customerVisit", "customerVisit.pet"})
    List<CustomerInvoice> findByCustomerVisit_Customer_Id(Integer id);
}
