package com.denysdudnik.vet_clinic.controllers.customer_account;

import com.denysdudnik.vet_clinic.dto.AuthTokenDetails;
import com.denysdudnik.vet_clinic.dto.CustomerDto;
import com.denysdudnik.vet_clinic.dto.CustomerResponse;
import com.denysdudnik.vet_clinic.dto.UserRequest;
import com.denysdudnik.vet_clinic.services.authentication_service.AuthenticationService;
import com.denysdudnik.vet_clinic.services.customer_service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
public class PersonalInfoController {
    private final CustomerService customerService;
    private final AuthenticationService authenticationService;

    @GetMapping("/showPersonalInfo")
    public ResponseEntity<CustomerResponse> showPersonalInfo(@RequestParam Integer userId) {
        CustomerDto customer = customerService.findById(userId);
        CustomerResponse customerResponse = customerService.buildResponse(customer);

        return ResponseEntity.ok().body(customerResponse);
    }

    @PatchMapping("/updatePersonalInfo")
    public ResponseEntity<CustomerResponse> updatePersonalInfo(@RequestBody UserRequest userRequest, @RequestParam Integer userId) {
        CustomerDto customer = customerService.findById(userId);

        if (!customer.getEmail().equals(userRequest.getEmail())) {
            CustomerDto updatedCustomer = customerService.updateCustomerInfo(userRequest, customer);

            AuthTokenDetails tokenDetails = authenticationService.generateAuthTokenAndUserId(updatedCustomer.getEmail());

            CustomerResponse customerResponse = customerService.buildResponse(tokenDetails.getToken(), updatedCustomer);

            return ResponseEntity.ok().body(customerResponse);
        } else {
            CustomerDto updatedCustomer = customerService.updateCustomerInfo(userRequest, customer);
            CustomerResponse customerResponse = customerService.buildResponse(updatedCustomer);

            return ResponseEntity.ok().body(customerResponse);
        }
    }
}
