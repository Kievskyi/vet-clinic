package com.denysdudnik.vet_clinic.mappers;

import com.denysdudnik.vet_clinic.dto.CustomerDto;
import com.denysdudnik.vet_clinic.dto.CustomerInvoiceDto;
import com.denysdudnik.vet_clinic.dto.CustomerVisitDto;
import com.denysdudnik.vet_clinic.entity.Customer;
import com.denysdudnik.vet_clinic.entity.CustomerInvoice;
import com.denysdudnik.vet_clinic.entity.CustomerVisit;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CustomerMapper {

    @Mapping(target = "role", source = "role.description")
    @Mapping(target = "userInfo", source = "customerInfo")
    @Mapping(target = "customerPets", source = "customerPets")
    @Mapping(target = "customerVisit", source = "customerVisit")
    CustomerDto customerToCustomerDto(Customer customer);

    CustomerVisitDto customerVisitToCustomerVisitDto(CustomerVisit customerVisit);

    @Mapping(target = "visitDateTime", source = "customerVisit.visitDateTime")
    @Mapping(target = "petName", source = "customerVisit.pet.name")
    @Mapping(target = "paymentStatus", source = "paymentStatus")
    CustomerInvoiceDto customerInvoiceToCustomerInvoiceDto(CustomerInvoice customerInvoice);
}
