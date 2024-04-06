package com.denysdudnik.vet_clinic.services;

import com.denysdudnik.vet_clinic.dto.UserRequest;
import com.denysdudnik.vet_clinic.dto.UserResponse;

public interface UserInfoService {

    UserResponse updateUserInfo(UserRequest userRequest, Integer userId);

    String getServiceName();
}
