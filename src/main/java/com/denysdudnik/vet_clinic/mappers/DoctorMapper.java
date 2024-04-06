package com.denysdudnik.vet_clinic.mappers;

import com.denysdudnik.vet_clinic.dto.DoctorAppointmentDto;
import com.denysdudnik.vet_clinic.dto.DoctorDto;
import com.denysdudnik.vet_clinic.entity.Doctor;
import com.denysdudnik.vet_clinic.entity.DoctorAppointment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface DoctorMapper {

    @Mapping(target = "role", source = "role.description")
    @Mapping(target = "userInfo", source = "doctorInfo")
    DoctorDto doctorToDoctorDto(Doctor doctor);

    @Mapping(target = "doctor", source = "doctor")
    @Mapping(target = "customer", source = "customerVisit.customer")
    @Mapping(target = "customer.role", source = "customerVisit.customer.role.description")
    @Mapping(target = "customer.userInfo", source = "customerVisit.customer.customerInfo")
    @Mapping(target = "customer.email", source = "customerVisit.customer.email")
    DoctorAppointmentDto appointmentToDoctorAppointmentDto(DoctorAppointment doctorAppointment);
}
