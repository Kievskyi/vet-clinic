package com.denysdudnik.vet_clinic.services.doctor_service;

import com.denysdudnik.vet_clinic.entity.Doctor;

public interface DoctorService {

    Doctor findById(Integer id);

    Doctor save(Doctor doctor);
}
