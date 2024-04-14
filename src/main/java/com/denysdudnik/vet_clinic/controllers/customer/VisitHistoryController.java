package com.denysdudnik.vet_clinic.controllers.customer;

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

    @GetMapping("/all-visits")
    public ResponseEntity<?> allVisits(@RequestParam Integer userId) {
        return ResponseEntity.ok().build();
    }
}
