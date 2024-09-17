package com.denysdudnik.vet_clinic.services.customer_invoice_service;

import com.denysdudnik.vet_clinic.dto.CustomerInvoiceDto;
import com.denysdudnik.vet_clinic.entity.CustomerInvoice;
import com.denysdudnik.vet_clinic.exception.NotFoundException;
import com.denysdudnik.vet_clinic.mappers.CustomerMapper;
import com.denysdudnik.vet_clinic.repository.CustomerInvoiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerInvoiceServiceImpl implements CustomerInvoiceService {
    private final CustomerInvoiceRepository invoiceRepository;
    private final CustomerMapper customerMapper;

    @Override
    public CustomerInvoice findById(Integer id) {
        return invoiceRepository.findById(id).orElseThrow(() -> new NotFoundException("Unable to find invoice with id: " + id));
    }

    @Override
    public List<CustomerInvoiceDto> findAllByCustomerId(Integer customerId) {
        return invoiceRepository.findByCustomerVisit_Customer_Id(customerId).stream()
                .map(customerMapper::customerInvoiceToCustomerInvoiceDto)
                .toList();
    }

    @Override
    public List<CustomerInvoice> findAll() {
        return invoiceRepository.findAll();
    }

    @Override
    public CustomerInvoice save(CustomerInvoice customerInvoice) {
        return invoiceRepository.save(customerInvoice);
    }
}
