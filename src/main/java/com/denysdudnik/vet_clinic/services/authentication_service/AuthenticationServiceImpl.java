package com.denysdudnik.vet_clinic.services.authentication_service;

import com.denysdudnik.vet_clinic.dto.AuthTokenDetails;
import com.denysdudnik.vet_clinic.security.UserDetailsImpl;
import com.denysdudnik.vet_clinic.security.utils.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserDetailsService userDetailsService;
    private final JwtTokenUtil jwtTokenUtil;
    private final AuthenticationManager authenticationManager;


    public Authentication authenticateUser(String email, String password) {
        Authentication authentication;

        try {
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)

            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (AuthenticationException e) {
            throw new AuthenticationException("Authentication failed for user: " + email, e) {
                @Override
                public String getMessage() {
                    return super.getMessage();
                }
            };
        }

        return authentication;
    }

    public AuthTokenDetails generateAuthTokenAndUserId(String email) {
        final UserDetailsImpl userDetails = (UserDetailsImpl) userDetailsService.loadUserByUsername(email);
        String token = jwtTokenUtil.generateToken(userDetails);
        String id = userDetails.getUser().getId().toString();

        return new AuthTokenDetails(token, id);
    }
}
