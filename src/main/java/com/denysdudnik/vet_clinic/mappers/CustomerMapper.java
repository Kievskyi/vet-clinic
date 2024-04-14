package com.denysdudnik.vet_clinic.mappers;

import com.denysdudnik.vet_clinic.dto.CustomerDto;
import com.denysdudnik.vet_clinic.dto.CustomerInvoiceDto;
import com.denysdudnik.vet_clinic.entity.Customer;
import com.denysdudnik.vet_clinic.entity.CustomerInvoice;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CustomerMapper {

    @Mapping(target = "role", source = "role.description")
    @Mapping(target = "userInfo", source = "customerInfo")
    CustomerDto customerToCustomerDto(Customer customer);

    @Mapping(target = "visitDateTime", source = "customerVisit.visitDateTime")
    @Mapping(target = "petName", source = "customerVisit.pet.name")
    @Mapping(target = "paymentStatus", source = "paymentStatus")
    CustomerInvoiceDto customerInvoiceToCustomerInvoiceDto(CustomerInvoice customerInvoice);
}
