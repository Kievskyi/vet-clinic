package com.denysdudnik.vet_clinic.controllers;

import com.denysdudnik.vet_clinic.entity.Clinic;
import com.denysdudnik.vet_clinic.entity.ServicePrice;
import com.denysdudnik.vet_clinic.entity.Specialty;
import com.denysdudnik.vet_clinic.services.clinic_service.ClinicService;
import com.denysdudnik.vet_clinic.services.clinic_service_price.ClinicServicePrice;
import com.denysdudnik.vet_clinic.services.specialties_service.SpecialtiesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/clinics")
@RequiredArgsConstructor
public class ClinicController {
    private final ClinicService clinicService;
    private final SpecialtiesService specialtiesService;
    private final ClinicServicePrice servicePrice;

    @GetMapping
    public ResponseEntity<List<Clinic>> getAllClinics() {
        List<Clinic> allClinics = clinicService.findAllClinics();

        if (allClinics == null || allClinics.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok().body(allClinics);
    }

    @GetMapping("/specialties")
    public ResponseEntity<List<Specialty>> getAllSpecialties() {
        List<Specialty> specialties = specialtiesService.findAll();

        if (specialties == null || specialties.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok().body(specialties);
    }

    @GetMapping("/services")
    public ResponseEntity<List<ServicePrice>> getAllServices() {
        List<ServicePrice> services = servicePrice.findAll();

        if (services == null || services.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok().body(services);
    }
}