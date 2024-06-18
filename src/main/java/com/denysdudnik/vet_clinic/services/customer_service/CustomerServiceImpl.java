package com.denysdudnik.vet_clinic.services.customer_service;

import com.denysdudnik.vet_clinic.dto.*;
import com.denysdudnik.vet_clinic.entity.*;
import com.denysdudnik.vet_clinic.enums.AppointmentStatus;
import com.denysdudnik.vet_clinic.mappers.CustomerMapper;
import com.denysdudnik.vet_clinic.repository.CustomerPetsRepository;
import com.denysdudnik.vet_clinic.repository.CustomerRepository;
import com.denysdudnik.vet_clinic.repository.DoctorRepository;
import com.denysdudnik.vet_clinic.services.UserInfoService;
import com.denysdudnik.vet_clinic.services.authentication_service.AuthenticationService;
import com.denysdudnik.vet_clinic.services.customer_info_service.CustomerInfoService;
import com.denysdudnik.vet_clinic.services.role.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService, UserInfoService {
    private final String SERVICE_NAME = "CUSTOMER";
    private final DoctorRepository doctorRepository;
    private final CustomerPetsRepository petsRepository;
    private final CustomerRepository customerRepository;
    private final CustomerInfoService customerInfoService;
    private final AuthenticationService authenticationService;
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
                .authProvider(userRequest.getAuthProvider())
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
    @Transactional
    public CustomerDto addNewAppointment(Integer customerId, Integer petId, Appointment appointment) {
        Customer customer = customerRepository.findById(customerId).orElseThrow(() -> new UsernameNotFoundException("Customer not found"));
        CustomerPet pet = petsRepository.findById(petId).orElseThrow(() -> new UsernameNotFoundException("Pet not found"));
        Doctor doctor = doctorRepository.findById(appointment.getDoctorId()).orElseThrow(() -> new UsernameNotFoundException("Doctor not found"));
        Clinic doctorsClinic = doctor.getDoctorInfo().getClinic();
        List<DoctorAppointment> doctorAppointments;
        List<CustomerVisit> visits = customer.getCustomerVisit();

        if (doctor.getDoctorAppointments() == null) {
            doctorAppointments = new ArrayList<>();
        } else {
            doctorAppointments = doctor.getDoctorAppointments();
        }

        CustomerVisit customerVisit = CustomerVisit.builder()
                .customer(customer)
                .pet(pet)
                .visitDateTime(appointment.getDateTime())
                .clinic(doctorsClinic)
                .appointmentStatus(AppointmentStatus.PLANNED)
                .build();

        DoctorAppointment doctorAppointment = DoctorAppointment.builder()
                .doctor(doctor)
                .customerVisit(customerVisit)
                .pet(pet)
                .appointmentStatus(AppointmentStatus.PLANNED)
                .visitDateTime(appointment.getDateTime())
                .build();
        visits.add(customerVisit);
        customer.setCustomerVisit(visits);
        doctorAppointments.add(doctorAppointment);
        doctor.setDoctorAppointments(doctorAppointments);

        doctorRepository.save(doctor);

        return customerMapper.customerToCustomerDto(customer);
    }

    @Override
    public UserResponse updateUserInfo(UserRequest userRequest, Integer userId) {
        Customer customer = customerRepository.findById(userId).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        CustomerInfo customerInfo = customer.getCustomerInfo();
        CustomerDto customerDto;

        customerInfo.setFirstName(userRequest.getFirstName());
        customerInfo.setLastName(userRequest.getLastName());
        customerInfo.setPhoneNumber(userRequest.getPhoneNumber());

        if (!userRequest.getEmail().equals(customer.getEmail())) {
            customer.setEmail(userRequest.getEmail());
            customerDto = customerMapper.customerToCustomerDto(customerRepository.save(customer));
            AuthTokenDetails tokenDetails = authenticationService.generateAuthTokenAndUserId(customerDto.getEmail());

            return buildResponse(tokenDetails.getToken(), customerDto);
        }

        customerDto = customerMapper.customerToCustomerDto(customerRepository.save(customer));

        return buildResponse(customerDto);
    }

    @Override
    public UserResponse buildResponse(CustomerDto customer) {
        return UserResponse.builder()
                .role(customer.getRole())
                .customer(customer)
                .build();
    }

    @Override
    public UserResponse buildResponse(String token, CustomerDto customer) {
        return UserResponse.builder()
                .token(token)
                .role(customer.getRole())
                .customer(customer)
                .build();
    }

    @Override
    public String getServiceName() {
        return this.SERVICE_NAME;
    }
}
