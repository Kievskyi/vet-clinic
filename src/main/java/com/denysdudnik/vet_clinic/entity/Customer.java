package com.denysdudnik.vet_clinic.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Entity
@DiscriminatorValue("1")
@SuperBuilder(builderMethodName = "customerBuilder")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Customer extends User {

    @OneToOne(mappedBy = "customer", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    private CustomerInfo customerInfo;

    @OneToMany(mappedBy = "customer")
    @JsonManagedReference
    private List<CustomerVisit> customerVisit;

    @OneToMany(mappedBy = "customer")
    @JsonManagedReference
    private List<CustomerPet> customerPets;
}
