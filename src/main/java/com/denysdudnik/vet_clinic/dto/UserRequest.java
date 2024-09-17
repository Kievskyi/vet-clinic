package com.denysdudnik.vet_clinic.dto;

import com.denysdudnik.vet_clinic.enums.AuthProvider;
import com.denysdudnik.vet_clinic.validation.AuthValidationGroup;
import com.denysdudnik.vet_clinic.validation.RegistrationValidationGroup;
import jakarta.validation.constraints.NotBlank;
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
    @NotBlank(groups = {RegistrationValidationGroup.class},
            message = "Firstname is required")
    private String firstName;
    @NotBlank(groups = {RegistrationValidationGroup.class},
            message = "Lastname is required")
    private String lastName;
    @NotBlank(groups = {RegistrationValidationGroup.class, AuthValidationGroup.class},
            message = "Email is mandatory")
    private String email;
    @NotBlank(groups = {RegistrationValidationGroup.class, AuthValidationGroup.class},
            message = "Password is mandatory")
    private String password;
    @NotBlank(groups = {RegistrationValidationGroup.class},
            message = "Phone number is required")
    private String phoneNumber;
    private String address;
    private String clinic;
    private String specialty;
    private LocalDate birthDate;
    private AuthProvider authProvider;
}
