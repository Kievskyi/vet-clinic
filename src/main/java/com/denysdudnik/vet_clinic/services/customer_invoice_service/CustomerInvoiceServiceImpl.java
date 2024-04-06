package com.denysdudnik.vet_clinic.services.customer_invoice_service;

import com.denysdudnik.vet_clinic.entity.CustomerInvoice;
import com.denysdudnik.vet_clinic.repository.CustomerInvoiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerInvoiceServiceImpl implements CustomerInvoiceService{
    private final CustomerInvoiceRepository invoiceRepository;

    @Override
    public List<CustomerInvoice> findAll() {
        return invoiceRepository.findAll();
    }

    @Override
    public CustomerInvoice save(CustomerInvoice customerInvoice) {
        return invoiceRepository.save(customerInvoice);
    }
}
