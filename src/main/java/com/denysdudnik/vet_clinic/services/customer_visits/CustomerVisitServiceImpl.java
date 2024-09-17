package com.denysdudnik.vet_clinic.services.customer_visits;

import com.denysdudnik.vet_clinic.entity.CustomerVisit;
import com.denysdudnik.vet_clinic.exception.NotFoundException;
import com.denysdudnik.vet_clinic.repository.CustomerVisitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomerVisitServiceImpl implements CustomerVisitService {
    private final CustomerVisitRepository customerVisitRepository;

    @Override
    public CustomerVisit findById(Integer id) {
        return customerVisitRepository.findById(id).orElseThrow(() -> new NotFoundException("Customers visit not found"));
    }

    @Override
    public CustomerVisit save(CustomerVisit visit) {
        return customerVisitRepository.save(visit);
    }
}
