package com.denysdudnik.vet_clinic.controllers.customer_account;

import com.denysdudnik.vet_clinic.entity.CustomerPet;
import com.denysdudnik.vet_clinic.services.customer_pets_service.CustomerPetsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
public class CustomerPetsController {
    private final CustomerPetsService petsService;


    @GetMapping("/showCustomerPets")
    public ResponseEntity<?> showCustomerPets(@RequestParam Integer customerId) {
        List<CustomerPet> petsByCustomerId;
        try {
            petsByCustomerId = petsService.getPetsByCustomerId(customerId);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Pets not found");
        }

        return ResponseEntity.ok().body(petsByCustomerId);
    }

    @DeleteMapping("/deletePet")
    public ResponseEntity<?> deletePet(@RequestBody CustomerPet customerPet) {
        List<CustomerPet> customerPets;
        try {
            customerPets = petsService.deletePetById(customerPet);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Pets not found");
        }

        return ResponseEntity.ok().body(customerPets);
    }
}
