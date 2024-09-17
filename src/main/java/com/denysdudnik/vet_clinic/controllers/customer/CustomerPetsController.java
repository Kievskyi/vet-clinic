package com.denysdudnik.vet_clinic.controllers.customer;

import com.denysdudnik.vet_clinic.dto.CustomerDto;
import com.denysdudnik.vet_clinic.dto.PetDto;
import com.denysdudnik.vet_clinic.entity.CustomerPet;
import com.denysdudnik.vet_clinic.exception.UserNotFoundException;
import com.denysdudnik.vet_clinic.services.customer_pets_service.CustomerPetsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customers")
@RequiredArgsConstructor
public class CustomerPetsController {
    private final CustomerPetsService petsService;

    @GetMapping("/{customerId}/pets")
    public ResponseEntity<?> getCustomerPets(@PathVariable Integer customerId) {
        List<CustomerPet> petsByCustomerId;
        try {
            petsByCustomerId = petsService.getPetsByCustomerId(customerId);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Pets not found");
        }

        return ResponseEntity.ok().body(petsByCustomerId);
    }

    @DeleteMapping("/{customerId}/pets/{petId}")
    public ResponseEntity<?> deletePet(@PathVariable Integer customerId,
                                       @PathVariable Integer petId) {
        CustomerDto customerDto;
        try {
            customerDto = petsService.deletePetById(customerId, petId);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Pets not found");
        }

        return ResponseEntity.ok().body(customerDto);
    }

    @PostMapping("/{customerId}/pets")
    public ResponseEntity<?> addNewPet(@PathVariable Integer customerId,
                                       @RequestBody PetDto newPet) {
        CustomerDto customerDto;
        try {
            customerDto = petsService.addNewPet(customerId, newPet);
        } catch (UserNotFoundException e) {
            return ResponseEntity.badRequest().body("Pet wasn't added");
        }

        return ResponseEntity.ok().body(customerDto);
    }
}