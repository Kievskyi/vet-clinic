package com.denysdudnik.vet_clinic.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "doctor_info", schema = "vet-clinic")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DoctorInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @Column(name = "name", nullable = false, length = 45)
    private String firstName;

    @Column(name = "surname", nullable = false, length = 45)
    private String lastName;

    @Column(name = "phone_number", nullable = false, length = 45)
    private String phoneNumber;

    @Column(name = "address", nullable = false, length = 45)
    private String address;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JoinColumn(name = "clinic_id")
    private Clinic clinic;

    @OneToOne
    @JoinColumn(name = "speciality")
    private Specialties specialties;
}