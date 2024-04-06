package com.denysdudnik.vet_clinic.dto;

import lombok.*;

import java.util.List;

@ToString
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ConsultationDetailsRequest {

    private List<String> treatments;
    private String report;
    private Integer customerAppointmentId;
    private Integer doctorAppointmentId;
}
