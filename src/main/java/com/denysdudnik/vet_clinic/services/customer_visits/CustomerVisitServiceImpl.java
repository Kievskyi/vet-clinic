package com.denysdudnik.vet_clinic.services.customer_visits;

import com.denysdudnik.vet_clinic.entity.*;
import com.denysdudnik.vet_clinic.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class CustomerVisitServiceImpl implements CustomerVisitService {
    private final CustomerRepository customerRepository;
    private final CustomerVisitRepository customerVisitRepository;
    private final CustomerPetsRepository customerPetsRepository;
    private final ServiceRepository serviceRepository;
    private final ClinicRepository clinicRepository;

    @Override
    @Transactional
    public Customer saveNewVisit() {
        Customer customer = customerRepository.findById(12).orElseThrow(() -> new RuntimeException("Ooops"));
        PetService service1 = serviceRepository.findById(1).orElseThrow(() -> new RuntimeException("Ooops"));
        PetService service2 = serviceRepository.findById(2).orElseThrow(() -> new RuntimeException("Ooops"));
        PetService service3 = serviceRepository.findById(3).orElseThrow(() -> new RuntimeException("Ooops"));
        Set<PetService> services = new HashSet<>();
        services.add(service1);
        services.add(service2);
        services.add(service3);

        Clinic clinic = clinicRepository.findById(1).orElseThrow(() -> new RuntimeException("Ooops"));

        CustomerPet pet = customerPetsRepository.findById(6).orElseThrow(() -> new RuntimeException("Ooops"));

        CustomerVisit customerVisit = CustomerVisit.builder()
                .customer(customer)
                .pet(pet)
                .petServices(services)
                .clinic(clinic)
                .build();

        List<CustomerVisit> customerVisits = customer.getCustomerVisit();

        if (customerVisits == null) {
            customerVisits = new ArrayList<>();
        }

        customerVisits.add(customerVisit);

        customer.setCustomerVisit(customerVisits);
        customerRepository.save(customer);


        return null;
    }

    @Override
    public CustomerVisit findById(Integer id) {
        return customerVisitRepository.findById(id).orElseThrow(() -> new RuntimeException("Customers visit not found"));
    }

    @Override
    public CustomerVisit save(CustomerVisit visit) {
        return customerVisitRepository.save(visit);
    }
}
