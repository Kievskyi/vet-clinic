package com.denysdudnik.vet_clinic.services.authentication_service;

import com.denysdudnik.vet_clinic.dto.AuthTokenDetails;
import org.springframework.security.core.Authentication;

public interface AuthenticationService {

    Authentication authenticateUser(String email, String password);

    AuthTokenDetails generateAuthTokenAndUserId(String email);


}
