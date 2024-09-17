package com.denysdudnik.vet_clinic.controllers;

import com.denysdudnik.vet_clinic.dto.AuthTokenDetails;
import com.denysdudnik.vet_clinic.dto.UserRequest;
import com.denysdudnik.vet_clinic.entity.User;
import com.denysdudnik.vet_clinic.enums.AuthProvider;
import com.denysdudnik.vet_clinic.services.authentication_service.AuthenticationService;
import com.denysdudnik.vet_clinic.services.customer_service.CustomerService;
import com.denysdudnik.vet_clinic.validation.AuthValidationGroup;
import com.denysdudnik.vet_clinic.validation.RegistrationValidationGroup;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
public class AuthenticationController {
    private final CustomerService customerService;
    private final AuthenticationService authenticationService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/authentication")
    public ResponseEntity<?> authenticate(@Validated(AuthValidationGroup.class)
                                          @RequestBody UserRequest userRequest) {
        try {
            authenticationService.authenticateUser(userRequest.getEmail(), userRequest.getPassword());
            AuthTokenDetails authTokenDetails = authenticationService.generateAuthTokenAndUserId(userRequest.getEmail());

            return ResponseEntity.ok().body(authTokenDetails);
        } catch (AuthenticationException e) {
            log.warn("Authentication failed: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication failed");
        }
    }

    @PostMapping("/registration")
    public ResponseEntity<?> registerNewUser(@Validated(RegistrationValidationGroup.class)
                                             @RequestBody UserRequest userRequest) {
        userRequest.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        userRequest.setAuthProvider(AuthProvider.LOCAL);
        User savedUser = customerService.save(userRequest);

        if (savedUser == null) {
            log.warn("Registration failed for request: {}", userRequest);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User could not be registered");
        }

        return ResponseEntity.ok().body("User was successfully registered");
    }
}
