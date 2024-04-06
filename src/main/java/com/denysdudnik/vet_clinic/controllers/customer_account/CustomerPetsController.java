package com.denysdudnik.vet_clinic.controllers.customer_account;

import com.denysdudnik.vet_clinic.dto.CustomerDto;
import com.denysdudnik.vet_clinic.dto.PetDto;
import com.denysdudnik.vet_clinic.entity.CustomerPet;
import com.denysdudnik.vet_clinic.services.customer_pets_service.CustomerPetsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
    public ResponseEntity<?> deletePet(@RequestParam Integer customerId,
                                       @RequestParam Integer petId) {
        CustomerDto customerDto;
        try {
            customerDto = petsService.deletePetById(customerId, petId);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Pets not found");
        }

        return ResponseEntity.ok().body(customerDto);
    }

    @PostMapping("/addNewPet")
    public ResponseEntity<?> addNewPet(@RequestBody PetDto newPet, @RequestParam Integer customerId) {
        CustomerDto customerDto;
        try {
            customerDto = petsService.addNewPet(customerId, newPet);
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

        return ResponseEntity.ok().body(customerDto);
    }
}
