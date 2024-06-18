package com.denysdudnik.vet_clinic.controllers;

import com.denysdudnik.vet_clinic.dto.AuthTokenDetails;
import com.denysdudnik.vet_clinic.dto.UserRequest;
import com.denysdudnik.vet_clinic.entity.Customer;
import com.denysdudnik.vet_clinic.entity.User;
import com.denysdudnik.vet_clinic.enums.AuthProvider;
import com.denysdudnik.vet_clinic.repository.UserRepository;
import com.denysdudnik.vet_clinic.security.UserDetailsImpl;
import com.denysdudnik.vet_clinic.security.utils.JwtTokenUtil;
import com.denysdudnik.vet_clinic.services.authentication_service.AuthenticationService;
import com.denysdudnik.vet_clinic.services.customer_service.CustomerService;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class OAuthController {
    private final UserRepository userRepository;
    private final CustomerService customerService;
    private final AuthenticationService authenticationService;

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String clientId;


    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(@RequestBody Map<String, String> payload) {
        String tokenId = payload.get("tokenId");

        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                .setAudience(Collections.singletonList(clientId))
                .build();

        GoogleIdToken idToken;
        try {
            idToken = verifier.verify(tokenId);
        } catch (IOException | GeneralSecurityException e) {
            return ResponseEntity.status(500).body("Error verifying Google token");
        }

        if (idToken == null) {
            return ResponseEntity.status(401).body("Invalid Google token");
        }

        GoogleIdToken.Payload googlePayload = idToken.getPayload();
        String firstName = (String) googlePayload.get("given_name");
        String lastName = (String) googlePayload.get("family_name");
        String email = googlePayload.getEmail();

        Optional<User> optionalUser = userRepository.findUserByEmail(email);

        UserRequest user = new UserRequest();
        if (optionalUser.isPresent()) {
            user.setEmail(optionalUser.get().getEmail());
        } else {
            user.setFirstName(firstName);
            user.setLastName(lastName);
            user.setEmail(email);
            user.setAuthProvider(AuthProvider.GOOGLE);
            user.setPassword("");
            customerService.save(user);
        }

        AuthTokenDetails authTokenDetails = authenticationService.generateAuthTokenAndUserId(user.getEmail());

        return ResponseEntity.ok().body(authTokenDetails);
    }
}
