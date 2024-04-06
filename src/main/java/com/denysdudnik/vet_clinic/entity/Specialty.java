package com.denysdudnik.vet_clinic.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "doctor_specialties")
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Specialty {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "description")
    private String description;
}
