package com.denysdudnik.vet_clinic.controllers;

import com.denysdudnik.vet_clinic.dto.*;
import com.denysdudnik.vet_clinic.entity.Role;
import com.denysdudnik.vet_clinic.services.UserInfoService;
import com.denysdudnik.vet_clinic.services.administrator_service.AdministratorService;
import com.denysdudnik.vet_clinic.services.customer_service.CustomerService;
import com.denysdudnik.vet_clinic.services.doctor_service.DoctorService;
import com.denysdudnik.vet_clinic.services.user_service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
public class PersonalInfoController {
    private final UserService userService;
    private final CustomerService customerService;
    private final DoctorService doctorService;
    private final AdministratorService administratorService;
    private final List<UserInfoService> userInfoServices;

    @GetMapping("/showPersonalInfo")
    public ResponseEntity<UserResponse> showPersonalInfo(@RequestParam Integer userId) {
        UserDto user = userService.findById(userId);
        UserResponse response = buildUserResponseByRole(user.getRole(), user.getId());

        if (response != null) {
            doctorService.createJs();
            return ResponseEntity.ok().body(response);
        }

        return ResponseEntity.badRequest().build();
    }

    @PatchMapping("/updatePersonalInfo")
    public ResponseEntity<UserResponse> updatePersonalInfo(@RequestBody UserRequest userRequest, @RequestParam Integer userId) {
        Role role = userService.findRoleByUserId(userId);
        UserResponse response = updateUserInfo(role, userId, userRequest);

        return ResponseEntity.ok().body(response);
    }

    private UserResponse updateUserInfo(Role role, Integer userId, UserRequest userRequest) {
        return userInfoServices.stream()
                .filter((service) -> service.getServiceName().equals(role.getDescription()))
                .map(userInfoService -> userInfoService.updateUserInfo(userRequest, userId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Unable to update user info"));
    }

    private UserResponse buildUserResponseByRole(String role, Integer userId) {
        switch (role) {
            case "CUSTOMER" -> {
                CustomerDto customer = customerService.findById(userId);
                return customerService.buildResponse(customer);
            }
            case "DOCTOR" -> {
                DoctorDto doctor = doctorService.findById(userId);
                return doctorService.buildResponse(doctor);
            }
            case "ADMINISTRATOR" -> {
                AdministratorDto administrator = administratorService.findById(userId);
                return administratorService.buildResponse(administrator);
            }
            default -> {
                return null;
            }
        }
    }
}
