package com.denysdudnik.vet_clinic.services.administrator_service;

import com.denysdudnik.vet_clinic.dto.AdministratorDto;
import com.denysdudnik.vet_clinic.dto.UserResponse;

public interface AdministratorService {

    AdministratorDto findById(Integer id);

    UserResponse buildResponse(AdministratorDto administratorDto);

    UserResponse buildResponse(String token, AdministratorDto administratorDto);
}
