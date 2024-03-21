package com.denysdudnik.vet_clinic.entity;

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

    @OneToOne
    @JoinColumn(name = "id")
    @MapsId
    private AdministratorInfo administratorInfo;

    //employees
}
