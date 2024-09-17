package com.denysdudnik.vet_clinic.services.doctor_service;

import com.denysdudnik.vet_clinic.dto.DoctorDto;
import com.denysdudnik.vet_clinic.dto.UserRequest;
import com.denysdudnik.vet_clinic.dto.UserResponse;

public interface DoctorService {

    DoctorDto findById(Integer id);

    DoctorDto save(UserRequest userRequest);

    void generateDoctorsJsFile();

    UserResponse buildResponse(DoctorDto doctorDto);

    UserResponse buildResponse(String token, DoctorDto doctorDto);
}
