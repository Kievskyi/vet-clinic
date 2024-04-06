package com.denysdudnik.vet_clinic.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PetDto {
    private String name;
    private String type;
    private String breed;
    private LocalDate birthDate;
}
