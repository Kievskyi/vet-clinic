package com.denysdudnik.vet_clinic.services.user_service;

import com.denysdudnik.vet_clinic.dto.UserDto;
import com.denysdudnik.vet_clinic.entity.Role;

public interface UserService {

    UserDto findById(Integer userId);

    UserDto findByEmail(String email);

    Role findRoleByUserId(Integer userId);
}
