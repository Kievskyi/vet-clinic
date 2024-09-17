package com.denysdudnik.vet_clinic.controllers.customer;

import com.denysdudnik.vet_clinic.dto.Appointment;
import com.denysdudnik.vet_clinic.dto.CustomerDto;
import com.denysdudnik.vet_clinic.services.customer_service.CustomerService;
import com.denysdudnik.vet_clinic.services.doctor_appointment_service.DoctorAppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/customers")
@RequiredArgsConstructor
public class AppointmentController {
    private final CustomerService customerService;
    private final DoctorAppointmentService doctorService;

    @PostMapping("/{customerId}/pets/{petId}/appointments")
    public ResponseEntity<CustomerDto> addNewAppointment(@PathVariable Integer customerId,
                                                         @PathVariable Integer petId,
                                                         @RequestBody Appointment appointment) {

        CustomerDto customerDto = customerService.addNewAppointment(customerId, petId, appointment);

        return ResponseEntity.ok().body(customerDto);
    }

    @GetMapping("/doctors/{doctorId}/available-slots")
    public ResponseEntity<List<LocalTime>> getAvailableSlots(@PathVariable Integer doctorId,
                                                             @RequestParam LocalDate date) {

        List<LocalTime> availableSlots = doctorService.getAvailableSlots(doctorId, date);

        return ResponseEntity.ok().body(availableSlots);
    }
}
