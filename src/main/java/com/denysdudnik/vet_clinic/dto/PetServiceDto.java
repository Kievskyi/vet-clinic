package com.denysdudnik.vet_clinic.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PetServiceDto {

    private Integer id;
    private String description;
    private String tagColor;
}
