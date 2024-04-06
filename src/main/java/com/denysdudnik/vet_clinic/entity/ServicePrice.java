package com.denysdudnik.vet_clinic.entity;

import jakarta.persistence.*;
import lombok.*;

@ToString
@Entity
@Table(name = "service_prices", schema = "vet-clinic")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ServicePrice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private Float price;

    @ManyToOne
    @JoinColumn(name = "service_id")
//    @JsonManagedReference
    private PetService service;
}
