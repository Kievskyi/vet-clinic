package com.denysdudnik.vet_clinic.dto;

import com.denysdudnik.vet_clinic.entity.AdministratorInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@EqualsAndHashCode(callSuper = true)
@SuperBuilder(builderMethodName = "administratorDtoBuilder")
@NoArgsConstructor
@AllArgsConstructor
public class AdministratorDto extends UserDto {

    private AdministratorInfo userInfo;
}
