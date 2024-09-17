package com.denysdudnik.vet_clinic.services.customer_invoice_service;

import com.denysdudnik.vet_clinic.dto.CustomerInvoiceDto;
import com.denysdudnik.vet_clinic.entity.CustomerInvoice;

import java.util.List;

public interface CustomerInvoiceService {

    CustomerInvoice findById(Integer id);

    List<CustomerInvoiceDto> findAllByCustomerId(Integer customerId);

    List<CustomerInvoice> findAll();

    CustomerInvoice save(CustomerInvoice customerInvoice);
}
