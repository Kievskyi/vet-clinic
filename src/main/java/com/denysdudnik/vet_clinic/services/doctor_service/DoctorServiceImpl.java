package com.denysdudnik.vet_clinic.services.doctor_service;

import com.denysdudnik.vet_clinic.entity.Doctor;
import com.denysdudnik.vet_clinic.repository.DoctorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DoctorServiceImpl implements DoctorService {
    private final DoctorRepository doctorRepository;


    @Override
    public Doctor findById(Integer id) {
        return doctorRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("Doctor not found"));
    }

    @Override
    public Doctor save(Doctor doctor) {
        return doctorRepository.save(doctor);
    }
}
