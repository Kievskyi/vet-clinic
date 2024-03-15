package com.denysdudnik.vet_clinic.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@DiscriminatorValue("1")
@Builder(builderMethodName = "customerBuilder")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Customer extends User {

    @OneToOne
    @JoinColumn(name = "id")
    @JsonManagedReference
    private CustomerInfo customerInfo;

    @OneToMany(mappedBy = "customer")
    @JsonManagedReference
    private List<CustomerVisit> customerVisit;
}
