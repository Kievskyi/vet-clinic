package com.denysdudnik.vet_clinic.dto;

import com.denysdudnik.vet_clinic.entity.DoctorInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@EqualsAndHashCode(callSuper = true)
@SuperBuilder(builderMethodName = "doctorDtoBuilder")
@NoArgsConstructor
@AllArgsConstructor
public class DoctorDto extends UserDto {

    private DoctorInfo doctorInfo;
}
