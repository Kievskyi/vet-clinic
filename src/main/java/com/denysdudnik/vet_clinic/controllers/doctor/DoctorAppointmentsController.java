package com.denysdudnik.vet_clinic.controllers.doctor;

import com.denysdudnik.vet_clinic.dto.ConsultationDetailsRequest;
import com.denysdudnik.vet_clinic.dto.DoctorAppointmentDto;
import com.denysdudnik.vet_clinic.services.doctor_appointment_service.DoctorAppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/doctor")
@RequiredArgsConstructor
public class DoctorAppointmentsController {
    private final DoctorAppointmentService appointmentService;

    @GetMapping("/all-appointments")
    public ResponseEntity<List<DoctorAppointmentDto>> allAppointments(@RequestParam Integer userId) {
        List<DoctorAppointmentDto> appointments;

        try {
            appointments = appointmentService.findAll(userId);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }

        appointments.forEach(System.out::println);

        return ResponseEntity.ok().body(appointments);
    }

    @PostMapping("/consultation-details")
    public ResponseEntity<?> consultationDetails(@RequestBody ConsultationDetailsRequest consultationDetails) {
        List<DoctorAppointmentDto> appointmentDtos = appointmentService.finishConsultation(consultationDetails);

        if (appointmentDtos.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok().body(appointmentDtos);
    }
}
