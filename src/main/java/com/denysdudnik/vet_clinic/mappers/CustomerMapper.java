package com.denysdudnik.vet_clinic.mappers;

import com.denysdudnik.vet_clinic.dto.CustomerDto;
import com.denysdudnik.vet_clinic.entity.Customer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CustomerMapper {

    @Mapping(target = "role", source = "role.description")
    @Mapping(target = "userInfo", source = "customerInfo")
    CustomerDto customerToCustomerDto(Customer customer);

}
