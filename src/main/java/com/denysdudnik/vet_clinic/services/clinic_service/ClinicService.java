package com.denysdudnik.vet_clinic.services.clinic_service;

import com.denysdudnik.vet_clinic.entity.Clinic;

import java.util.List;

public interface ClinicService {

    List<Clinic> findAllClinics();

    Clinic findByName(String clinicName);
}
