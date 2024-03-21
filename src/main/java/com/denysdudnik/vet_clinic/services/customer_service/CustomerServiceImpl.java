package com.denysdudnik.vet_clinic.services.customer_service;

import com.denysdudnik.vet_clinic.dto.CustomerDto;
import com.denysdudnik.vet_clinic.dto.UserRequest;
import com.denysdudnik.vet_clinic.dto.CustomerResponse;
import com.denysdudnik.vet_clinic.entity.Customer;
import com.denysdudnik.vet_clinic.entity.CustomerInfo;
import com.denysdudnik.vet_clinic.entity.Role;
import com.denysdudnik.vet_clinic.mappers.CustomerMapper;
import com.denysdudnik.vet_clinic.repository.CustomerRepository;
import com.denysdudnik.vet_clinic.services.customerInfo_service.CustomerInfoService;
import com.denysdudnik.vet_clinic.services.role.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {
    private final CustomerRepository customerRepository;
    private final CustomerInfoService customerInfoService;
    private final RoleService roleService;
    private final CustomerMapper customerMapper;

    @Override
    public CustomerDto findById(Integer id) {
        return customerMapper.customerToCustomerDto(
                customerRepository
                        .findById(id)
                        .orElseThrow(() -> new UsernameNotFoundException("Customer not found"))
        );
    }

    @Override
    public Customer findByEmail(String email) {
        return customerRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("Customer not found"));
    }

    @Override
    public CustomerDto updateCustomerInfo(UserRequest userRequest, CustomerDto customerDto) {
        Customer customer = customerRepository.findById(customerDto.getId()).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        CustomerInfo customerInfo = customer.getCustomerInfo();

        customerInfo.setFirstName(userRequest.getFirstName());
        customerInfo.setLastName(userRequest.getLastName());
        customerInfo.setPhoneNumber(userRequest.getPhoneNumber());

        customer.setEmail(userRequest.getEmail());

        return customerMapper.customerToCustomerDto(customerRepository.save(customer));
    }


    @Override
    @Transactional
    public Customer save(UserRequest userRequest) {
        Role role = roleService.findByDescription("USER");

        Customer customer = Customer.customerBuilder()
                .email(userRequest.getEmail())
                .password(userRequest.getPassword())
                .role(role)
                .build();

        customer = customerRepository.save(customer);

        CustomerInfo customerInfo = CustomerInfo.builder()
                .customer(customer)
                .phoneNumber(userRequest.getPhoneNumber())
                .firstName(userRequest.getFirstName())
                .lastName(userRequest.getLastName())
                .build();

        CustomerInfo savedCustomerInfo = customerInfoService.save(customerInfo);
        customer.setCustomerInfo(savedCustomerInfo);

        return customer;
    }

    @Override
    public CustomerResponse buildResponse(CustomerDto customer) {
        return CustomerResponse.builder()
                .customer(customer)
                .build();
    }

    @Override
    public CustomerResponse buildResponse(String token, CustomerDto customer) {
        return CustomerResponse.builder()
                .token(token)
                .customer(customer)
                .build();
    }
}
