package com.denysdudnik.vet_clinic.controllers;

import com.denysdudnik.vet_clinic.dto.AuthTokenDetails;
import com.denysdudnik.vet_clinic.dto.UserRequest;
import com.denysdudnik.vet_clinic.entity.User;
import com.denysdudnik.vet_clinic.enums.AuthProvider;
import com.denysdudnik.vet_clinic.repository.UserRepository;
import com.denysdudnik.vet_clinic.services.authentication_service.AuthenticationService;
import com.denysdudnik.vet_clinic.services.customer_service.CustomerService;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
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
            log.info("Error verifying Google token", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error verifying Google token");
        }

        if (idToken == null) {
            log.info("Google token is null");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Google token is null");
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
