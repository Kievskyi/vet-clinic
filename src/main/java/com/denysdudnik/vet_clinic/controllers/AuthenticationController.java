package com.denysdudnik.vet_clinic.controllers;

import com.denysdudnik.vet_clinic.dto.AuthTokenDetails;
import com.denysdudnik.vet_clinic.dto.UserRequest;
import com.denysdudnik.vet_clinic.entity.User;
import com.denysdudnik.vet_clinic.services.authentication_service.AuthenticationService;
import com.denysdudnik.vet_clinic.services.customer_service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthenticationController {
    private final CustomerService customerService;
    private final AuthenticationService authenticationService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/authentication")
    public ResponseEntity<?> authenticate(@RequestBody UserRequest userRequest) {
        try {
            authenticationService.authenticateUser(userRequest.getEmail(), userRequest.getPassword());
            AuthTokenDetails authTokenDetails = authenticationService.generateAuthTokenAndUserId(userRequest.getEmail());

            return ResponseEntity.ok().body(authTokenDetails);
        } catch (AuthenticationException e) {

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @PostMapping("/registration")
    public ResponseEntity<?> registerNewUser(@RequestBody UserRequest userRequest) {
        userRequest.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        User savedUser = customerService.save(userRequest);

        if (savedUser == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User could not be registered");
        }

        return ResponseEntity.ok().body("Successfully registered");
    }
}
