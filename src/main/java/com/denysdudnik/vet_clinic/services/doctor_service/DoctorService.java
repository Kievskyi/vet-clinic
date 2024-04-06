package com.denysdudnik.vet_clinic.services.doctor_service;

import com.denysdudnik.vet_clinic.dto.DoctorDto;
import com.denysdudnik.vet_clinic.dto.UserRequest;
import com.denysdudnik.vet_clinic.dto.UserResponse;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface DoctorService {

    DoctorDto findById(Integer id);

    DoctorDto save(UserRequest userRequest);

    //TODO Нужно перенести в утильный сервис и переназвать
    void createJs();

    UserResponse buildResponse(DoctorDto doctorDto);

    UserResponse buildResponse(String token, DoctorDto doctorDto);

    //TODO думаю что нужно перенести его по логике в DoctorAppointmentService
    List<LocalTime> getAvailableSlots(Integer doctorId, LocalDate date);
}
