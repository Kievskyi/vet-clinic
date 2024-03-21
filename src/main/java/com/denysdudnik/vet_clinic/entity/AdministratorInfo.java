package com.denysdudnik.vet_clinic.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "administrator_info", schema = "vet-clinic")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdministratorInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private Administrator user;

    @Column(name = "first_name", nullable = false, length = 45)
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 45)
    private String lastName;

    @Column(name = "phone_number", nullable = false, length = 45)
    private String phoneNumber;

    @Column(name = "address", nullable = false, length = 45)
    private String address;
}
