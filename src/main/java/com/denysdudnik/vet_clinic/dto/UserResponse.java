package com.denysdudnik.vet_clinic.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    private String role;
    private String token;
    private CustomerDto customer;
    private DoctorDto doctor;
    private AdministratorDto administrator;
}
