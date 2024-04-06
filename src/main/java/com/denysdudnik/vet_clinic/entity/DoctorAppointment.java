package com.denysdudnik.vet_clinic.entity;

import com.denysdudnik.vet_clinic.enums.Status;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "doctor_appointment", schema = "vet-clinic")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DoctorAppointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "customer_visit_id")
    private CustomerVisit customerVisit;

    @OneToOne
    @JoinColumn(name = "pet_id")
    private CustomerPet pet;

    @Column(name = "visit_date")
    private LocalDateTime visitDateTime;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

}