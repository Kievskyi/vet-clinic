package com.denysdudnik.vet_clinic.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@EqualsAndHashCode(callSuper = true)
@SuperBuilder(builderMethodName = "administratorDtoBuilder")
@NoArgsConstructor
@AllArgsConstructor
public class AdministratorDto extends UserDto {

    private String info;

}
