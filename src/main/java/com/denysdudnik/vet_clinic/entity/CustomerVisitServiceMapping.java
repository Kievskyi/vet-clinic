package com.denysdudnik.vet_clinic.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "customer_visits_services", schema = "vet-clinic")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerVisitServiceMapping {

    @EmbeddedId
    private CustomerVisitServiceIdMapping id;

    @MapsId("customerVisitId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "customer_visit_id")
    private CustomerVisit customerVisit;

    @MapsId("serviceId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "service_id")
    private PetService petService;
}