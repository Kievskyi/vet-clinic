package com.denysdudnik.vet_clinic.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "services", schema = "vet-clinic")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PetService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "tag_color")
    private String tagColor;
}
