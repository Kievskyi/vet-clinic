package com.denysdudnik.vet_clinic.dto;

import com.denysdudnik.vet_clinic.entity.DoctorAppointment;
import com.denysdudnik.vet_clinic.entity.DoctorInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@SuperBuilder(builderMethodName = "doctorDtoBuilder")
@NoArgsConstructor
@AllArgsConstructor
public class DoctorDto extends UserDto {

    private DoctorInfo userInfo;

    @JsonIgnore
    private List<DoctorAppointment> doctorAppointments;
}
