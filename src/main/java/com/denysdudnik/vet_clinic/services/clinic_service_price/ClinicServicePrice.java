package com.denysdudnik.vet_clinic.services.clinic_service_price;

import com.denysdudnik.vet_clinic.entity.ServicePrice;

import java.util.List;

public interface ClinicServicePrice {

    List<ServicePrice> findAll();

    ServicePrice findByDescription(String description);

    Float getSumByDescription(List<String> descriptions);
}
