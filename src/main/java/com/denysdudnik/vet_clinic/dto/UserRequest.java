package com.denysdudnik.vet_clinic.dto;

import com.denysdudnik.vet_clinic.enums.AuthProvider;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phoneNumber;
    private String address;
    private String clinic;
    private String specialty;
    private LocalDate birthDate;
    private AuthProvider authProvider;
}
