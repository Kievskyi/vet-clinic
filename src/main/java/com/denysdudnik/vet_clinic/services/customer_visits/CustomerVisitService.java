package com.denysdudnik.vet_clinic.services.customer_visits;

import com.denysdudnik.vet_clinic.entity.CustomerVisit;

public interface CustomerVisitService {

    CustomerVisit findById(Integer id);

    CustomerVisit save(CustomerVisit visit);
}
