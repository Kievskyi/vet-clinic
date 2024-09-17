package com.denysdudnik.vet_clinic.controllers.doctor;

import com.denysdudnik.vet_clinic.dto.ConsultationDetailsRequest;
import com.denysdudnik.vet_clinic.dto.DoctorAppointmentDto;
import com.denysdudnik.vet_clinic.services.doctor_appointment_service.DoctorAppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/doctors")
@RequiredArgsConstructor
public class DoctorAppointmentsController {
    private final DoctorAppointmentService appointmentService;

    @GetMapping("/{userId}/appointments")
    public ResponseEntity<List<DoctorAppointmentDto>> getAllAppointments(@PathVariable Integer userId) {
        List<DoctorAppointmentDto> appointments = appointmentService.findAll(userId);

        return ResponseEntity.ok().body(appointments);
    }

    @PostMapping("/appointments/consultation-details")
    public ResponseEntity<?> finishConsultation(@RequestBody ConsultationDetailsRequest consultationDetails) {
        List<DoctorAppointmentDto> appointmentDtos;

        try {
            appointmentDtos = appointmentService.finishConsultation(consultationDetails);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

        if (appointmentDtos.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok().body(appointmentDtos);
    }
}