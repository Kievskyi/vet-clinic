package com.denysdudnik.vet_clinic.controllers.customer;

import com.denysdudnik.vet_clinic.dto.Appointment;
import com.denysdudnik.vet_clinic.dto.CustomerDto;
import com.denysdudnik.vet_clinic.services.customer_service.CustomerService;
import com.denysdudnik.vet_clinic.services.doctor_service.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
public class AppointmentController {
    private final CustomerService customerService;
    private final DoctorService doctorService;

    @PostMapping("/newAppointment")
    public ResponseEntity<CustomerDto> addNewAppointment(@RequestBody Appointment appointment,
                                                         @RequestParam Integer customerId,
                                                         @RequestParam Integer petId) {

        CustomerDto customerDto = customerService.addNewAppointment(customerId, petId, appointment);


        return ResponseEntity.ok().body(customerDto);
    }

    //TODO need to replace this endpoint to DoctorController
    @GetMapping("/available-slots")
    public ResponseEntity<List<LocalTime>> availableSlots(@RequestParam Integer doctorId,
                                                          @RequestParam LocalDate date) {

        List<LocalTime> availableSlots = doctorService.getAvailableSlots(doctorId, date);

        return ResponseEntity.ok().body(availableSlots);
    }
}
