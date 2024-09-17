package com.denysdudnik.vet_clinic.services.specialties_service;

import com.denysdudnik.vet_clinic.entity.Specialty;
import com.denysdudnik.vet_clinic.exception.NotFoundException;
import com.denysdudnik.vet_clinic.repository.SpecialtiesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SpecialtiesServiceImpl implements SpecialtiesService {
    private final SpecialtiesRepository specialtiesRepository;

    @Override
    public List<Specialty> findAll() {
        return specialtiesRepository.findAll();
    }

    @Override
    public Specialty findByDescription(String description) {
        return specialtiesRepository.findByDescription(description).orElseThrow(() -> new NotFoundException("Specialty not found"));
    }
}
