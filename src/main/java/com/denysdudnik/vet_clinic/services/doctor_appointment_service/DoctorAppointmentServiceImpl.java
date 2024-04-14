package com.denysdudnik.vet_clinic.services.doctor_appointment_service;

import com.denysdudnik.vet_clinic.dto.ConsultationDetailsRequest;
import com.denysdudnik.vet_clinic.dto.DoctorAppointmentDto;
import com.denysdudnik.vet_clinic.entity.*;
import com.denysdudnik.vet_clinic.enums.AppointmentStatus;
import com.denysdudnik.vet_clinic.enums.PaymentStatus;
import com.denysdudnik.vet_clinic.mappers.DoctorMapper;
import com.denysdudnik.vet_clinic.repository.DoctorAppointmentsRepository;
import com.denysdudnik.vet_clinic.services.clinic_service_price.ClinicServicePrice;
import com.denysdudnik.vet_clinic.services.customer_invoice_service.CustomerInvoiceService;
import com.denysdudnik.vet_clinic.services.customer_visits.CustomerVisitService;
import com.denysdudnik.vet_clinic.services.mail_service.MailService;
import com.mailjet.client.errors.MailjetException;
import com.mailjet.client.errors.MailjetSocketTimeoutException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class DoctorAppointmentServiceImpl implements DoctorAppointmentService {
    private final DoctorAppointmentsRepository doctorAppointmentsRepository;
    private final CustomerVisitService customerVisitService;
    private final ClinicServicePrice clinicServicePrice;
    private final CustomerInvoiceService customerInvoiceService;
    private final DoctorMapper doctorMapper;
    private final MailService mailService;

    @Override
    public List<LocalTime> getAvailableSlots(Integer doctorId, LocalDate date) {
        return null;
    }

    @Override
    public List<DoctorAppointmentDto> findAll(Integer userId) {
        List<DoctorAppointment> appointments = doctorAppointmentsRepository.findAllByUserId(userId);
        List<DoctorAppointmentDto> appointmentDtos = new ArrayList<>();

        for (DoctorAppointment appointment : appointments) {
            appointmentDtos.add(doctorMapper.appointmentToDoctorAppointmentDto(appointment));
        }

        return appointmentDtos;
    }

    @Override
    @Transactional
    public List<DoctorAppointmentDto> finishConsultation(ConsultationDetailsRequest consultationDetails) {
        CustomerVisit customerVisit = customerVisitService.findById(consultationDetails.getCustomerAppointmentId());
        DoctorAppointment doctorAppointment = doctorAppointmentsRepository.findById(consultationDetails.getDoctorAppointmentId()).orElseThrow(() -> new IllegalArgumentException("Doctor appointment not found"));
        Set<PetService> petServices = new HashSet<>();

        for (String treatment : consultationDetails.getTreatments()) {
            ServicePrice servicePrice = clinicServicePrice.findByDescription(treatment);
            petServices.add(servicePrice.getService());
        }

        Float totalPriceForConsultation = clinicServicePrice.getSumByDescription(consultationDetails.getTreatments());

        customerVisit.setPetServices(petServices);
        customerVisit.setDoctorReport(consultationDetails.getReport());
        customerVisit.setAppointmentStatus(AppointmentStatus.FINISHED);

        CustomerInvoice customerInvoice = CustomerInvoice.builder()
                .customerVisit(customerVisit)
                .totalAmount(totalPriceForConsultation)
                .paymentStatus(PaymentStatus.UNPAID)
                .build();

        doctorAppointment.setAppointmentStatus(AppointmentStatus.FINISHED);
        doctorAppointmentsRepository.save(doctorAppointment);

        CustomerVisit savedVisit = customerVisitService.save(customerVisit);

        if (savedVisit == null) {
            throw new IllegalArgumentException("Visit was not updated");
        }

        CustomerInvoice savedInvoice = customerInvoiceService.save(customerInvoice);

        if (savedInvoice == null) {
            throw new IllegalArgumentException("Invoice was not saved");
        }

        List<DoctorAppointment> appointments = doctorAppointmentsRepository.findAll();
        List<DoctorAppointmentDto> appointmentDtos = new ArrayList<>();

        for (DoctorAppointment appointment : appointments) {
            appointmentDtos.add(doctorMapper.appointmentToDoctorAppointmentDto(appointment));
        }

        String email = customerVisit.getCustomer().getEmail();
        String firstName = customerVisit.getCustomer().getCustomerInfo().getFirstName();
        String report = customerVisit.getDoctorReport();

        try {
            mailService.sendEmail(email, firstName, report);
        } catch (MailjetSocketTimeoutException | MailjetException e) {
            throw new RuntimeException("Unable to send email : " + e.getMessage());
        }

        return appointmentDtos;
    }
}
