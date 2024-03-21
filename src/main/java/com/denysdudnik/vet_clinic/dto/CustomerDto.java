package com.denysdudnik.vet_clinic.dto;

import com.denysdudnik.vet_clinic.entity.CustomerInfo;
import com.denysdudnik.vet_clinic.entity.CustomerPet;
import com.denysdudnik.vet_clinic.entity.CustomerVisit;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@SuperBuilder(builderMethodName = "customerDtoBuilder")
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDto extends UserDto {

    private CustomerInfo customerInfo;
    private List<CustomerVisit> customerVisit;
    private List<CustomerPet> customerPets;
}
