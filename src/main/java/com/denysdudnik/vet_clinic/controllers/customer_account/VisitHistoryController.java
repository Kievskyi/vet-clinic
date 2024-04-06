package com.denysdudnik.vet_clinic.controllers.customer_account;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
public class VisitHistoryController {

    @GetMapping("/showVisitHistory")
    public ResponseEntity<?> showVisitHistory(@RequestParam Integer customerId) {
        return ResponseEntity.ok().build();
    }
}
