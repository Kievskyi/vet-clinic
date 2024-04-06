package com.denysdudnik.vet_clinic.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Entity
@DiscriminatorValue("3")
@SuperBuilder(builderMethodName = "administratorBuilder")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Administrator extends User {

    @OneToOne(mappedBy = "administrator", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    private AdministratorInfo administratorInfo;
}
