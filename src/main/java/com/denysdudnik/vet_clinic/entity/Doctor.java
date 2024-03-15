package com.denysdudnik.vet_clinic.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@DiscriminatorValue("2")
@Builder(builderMethodName = "doctorBuilder")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Doctor extends User {

    @OneToOne
    @JoinColumn(name = "id")
    @MapsId
    private DoctorInfo doctorInfo;
}
