package com.denysdudnik.vet_clinic.dto;

import com.denysdudnik.vet_clinic.enums.AppointmentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomerVisitDto {

    private Integer id;
    private PetDto pet;
    private ClinicDto clinic;
    private LocalDateTime visitDateTime;
    private Set<PetServiceDto> petServices;
    private AppointmentStatus appointmentStatus;
    private String doctorReport;
}
