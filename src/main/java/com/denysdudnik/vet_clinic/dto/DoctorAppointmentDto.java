package com.denysdudnik.vet_clinic.dto;

import com.denysdudnik.vet_clinic.entity.CustomerPet;
import com.denysdudnik.vet_clinic.entity.CustomerVisit;
import com.denysdudnik.vet_clinic.enums.AppointmentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DoctorAppointmentDto {

    private Integer id;
    private DoctorDto doctor;
    private CustomerVisit customerVisit;
    private CustomerDto customer;
    private CustomerPet pet;
    private LocalDateTime visitDateTime;
    private AppointmentStatus appointmentStatus;
}
