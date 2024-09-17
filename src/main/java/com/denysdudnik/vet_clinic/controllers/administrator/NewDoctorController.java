package com.denysdudnik.vet_clinic.controllers.administrator;

import com.denysdudnik.vet_clinic.dto.DoctorDto;
import com.denysdudnik.vet_clinic.dto.UserRequest;
import com.denysdudnik.vet_clinic.services.doctor_service.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/doctors")
@RequiredArgsConstructor
public class NewDoctorController {
    private final DoctorService doctorService;

    @PostMapping
    public ResponseEntity<String> registerNewDoctor(@RequestBody UserRequest userRequest) {
        DoctorDto savedDoctor = doctorService.save(userRequest);

        if (savedDoctor == null) {
            return ResponseEntity.badRequest().body("Doctor wasn't added");
        }
        doctorService.generateDoctorsJsFile();

        return ResponseEntity.ok().body("Doctor was successfully added");
    }
}