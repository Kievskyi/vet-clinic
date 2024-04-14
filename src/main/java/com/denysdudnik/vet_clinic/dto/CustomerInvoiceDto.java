package com.denysdudnik.vet_clinic.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CustomerInvoiceDto {

    private Integer id;
    private String petName;
    private LocalDateTime visitDateTime;
    private Float totalAmount;
    private String paymentStatus;
}
