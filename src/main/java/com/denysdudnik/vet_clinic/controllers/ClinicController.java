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
@RequestMapping("/clinic-info")
@RequiredArgsConstructor
public class ClinicController {
    private final ClinicService clinicService;
    private final SpecialtiesService specialtiesService;
    private final ClinicServicePrice servicePrice;

    @GetMapping("/all-clinics")
    public ResponseEntity<List<Clinic>> allClinics() {
        List<Clinic> allClinics = clinicService.findAllClinics();

        return ResponseEntity.ok().body(allClinics);
    }

    @GetMapping("all-specialties")
    public ResponseEntity<List<Specialty>> allSpecialties() {
        List<Specialty> specialties = specialtiesService.findAll();

        if (specialties == null) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok().body(specialties);
    }

    @GetMapping("/all-services")
    public ResponseEntity<List<ServicePrice>> allServices() {
        List<ServicePrice> services = servicePrice.findAll();

        if (services == null) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok().body(services);
    }
}
