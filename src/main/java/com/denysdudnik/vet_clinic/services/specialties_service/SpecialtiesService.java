package com.denysdudnik.vet_clinic.services.specialties_service;

import com.denysdudnik.vet_clinic.entity.Specialty;

import java.util.List;

public interface SpecialtiesService {

    List<Specialty> findAll();

    Specialty findByDescription(String description);
}
