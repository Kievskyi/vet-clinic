package com.denysdudnik.vet_clinic.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Entity
@DiscriminatorValue("2")
@SuperBuilder(builderMethodName = "doctorBuilder")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Doctor extends User {

    @OneToOne(mappedBy = "doctor", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    private DoctorInfo doctorInfo;

    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    List<DoctorAppointment> doctorAppointments;
}
