package com.denysdudnik.vet_clinic.entity;

import com.denysdudnik.vet_clinic.enums.AppointmentStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "customer_visits", schema = "vet-clinic")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerVisit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "pet_id")
    private CustomerPet pet;

    @ManyToOne(optional = false)
    @JoinColumn(name = "clinic_id")
    private Clinic clinic;

    @Column(name = "visit_date")
    private LocalDateTime visitDateTime;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "customer_visits_services",
            joinColumns = @JoinColumn(name = "customer_visit_id"),
            inverseJoinColumns = @JoinColumn(name = "service_id")
    )
    private Set<PetService> petServices;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private AppointmentStatus appointmentStatus;

    @Lob
    @Column(name = "doctor_report", columnDefinition = "TEXT")
    private String doctorReport;
}