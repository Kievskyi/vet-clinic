package com.denysdudnik.vet_clinic.repository;

import com.denysdudnik.vet_clinic.entity.ServicePrice;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ServicePriceRepository extends JpaRepository<ServicePrice, Integer> {

    Optional<ServicePrice> findByDescription(String description);

    @Query("SELECT SUM(s.price) FROM ServicePrice s WHERE s.description IN ?1")
    Float getSumByDescription(List<String> description);

    @EntityGraph(attributePaths = {"service"})
    List<ServicePrice> findAll();
}
