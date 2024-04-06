package com.denysdudnik.vet_clinic.mappers;

import com.denysdudnik.vet_clinic.dto.AdministratorDto;
import com.denysdudnik.vet_clinic.entity.Administrator;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AdministratorMapper {

    @Mapping(target = "role", source = "role.description")
    @Mapping(target = "userInfo", source = "administratorInfo")
    AdministratorDto administratorToAdministratorDto(Administrator administrator);
}
