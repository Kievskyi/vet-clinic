package com.denysdudnik.vet_clinic.services.doctor_appointment_service;

import com.denysdudnik.vet_clinic.dto.ConsultationDetailsRequest;
import com.denysdudnik.vet_clinic.dto.DoctorAppointmentDto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface DoctorAppointmentService {

    List<DoctorAppointmentDto> findAll(Integer userId);

    List<LocalTime> getAvailableSlots(Integer doctorId, LocalDate date);

    List<DoctorAppointmentDto> finishConsultation(ConsultationDetailsRequest consultationDetails);
}
