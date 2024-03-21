package com.denysdudnik.vet_clinic.services.administrator_service;

import com.denysdudnik.vet_clinic.entity.Administrator;
import com.denysdudnik.vet_clinic.repository.AdministratorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdministratorServiceImpl implements AdministratorService {
    private final AdministratorRepository administratorRepository;


    @Override
    public Administrator findById(Integer id) {
        return administratorRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invalid administrator id: " + id));
    }
}
