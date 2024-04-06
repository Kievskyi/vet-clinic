package com.denysdudnik.vet_clinic.services.clinic_service;

import com.denysdudnik.vet_clinic.entity.Clinic;
import com.denysdudnik.vet_clinic.repository.ClinicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClinicServiceImpl implements ClinicService{
    private final ClinicRepository clinicRepository;

    @Override
    public List<Clinic> findAllClinics() {
        return clinicRepository.findAll();
    }

    @Override
    public Clinic findByName(String clinicName) {
        return clinicRepository.findByName(clinicName).orElseThrow(() -> new RuntimeException("Clinic not found"));
    }
}
