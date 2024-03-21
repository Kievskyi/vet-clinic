package com.denysdudnik.vet_clinic.services.user_service;

import com.denysdudnik.vet_clinic.entity.User;

public interface UserService {

    User findUserById(User user);

    User findUserByEmail(String email);
}
