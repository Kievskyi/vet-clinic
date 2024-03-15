package com.denysdudnik.vet_clinic.controllers;

import com.denysdudnik.vet_clinic.entity.Customer;
import com.denysdudnik.vet_clinic.services.CustomerServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MainPageController {
    private final CustomerServiceImpl customerServiceImpl;

    @GetMapping("/")
    public ResponseEntity<Customer> getCustomer(@RequestParam int id) {
        System.out.println(customerServiceImpl.findById(id));
        return new ResponseEntity<>(customerServiceImpl.findById(id), HttpStatus.OK);
    }
}
