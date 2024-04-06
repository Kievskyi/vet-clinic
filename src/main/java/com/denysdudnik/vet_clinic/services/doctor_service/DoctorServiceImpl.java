package com.denysdudnik.vet_clinic.services.doctor_service;

import com.denysdudnik.vet_clinic.dto.AuthTokenDetails;
import com.denysdudnik.vet_clinic.dto.DoctorDto;
import com.denysdudnik.vet_clinic.dto.UserRequest;
import com.denysdudnik.vet_clinic.dto.UserResponse;
import com.denysdudnik.vet_clinic.entity.*;
import com.denysdudnik.vet_clinic.mappers.DoctorMapper;
import com.denysdudnik.vet_clinic.repository.DoctorAppointmentsRepository;
import com.denysdudnik.vet_clinic.repository.DoctorRepository;
import com.denysdudnik.vet_clinic.services.UserInfoService;
import com.denysdudnik.vet_clinic.services.authentication_service.AuthenticationService;
import com.denysdudnik.vet_clinic.services.clinic_service.ClinicService;
import com.denysdudnik.vet_clinic.services.role.RoleService;
import com.denysdudnik.vet_clinic.services.specialties_service.SpecialtiesService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DoctorServiceImpl implements DoctorService, UserInfoService {
    private final String SERVICE_NAME = "DOCTOR";
    private final DoctorRepository doctorRepository;
    private final DoctorAppointmentsRepository appointmentsRepository;
    private final DoctorMapper doctorMapper;
    private final SpecialtiesService specialtiesService;
    private final ClinicService clinicService;
    private final RoleService roleService;
    private final AuthenticationService authenticationService;
    private final PasswordEncoder passwordEncoder;
    private final ObjectMapper objectMapper;


    @Override
    public DoctorDto findById(Integer id) {
        return doctorMapper.doctorToDoctorDto(
                doctorRepository
                        .findById(id)
                        .orElseThrow(() -> new UsernameNotFoundException("Doctor not found"))
        );
    }

    @Override
    @Transactional
    public DoctorDto save(UserRequest userRequest) {
        Specialty specialty = specialtiesService.findByDescription(userRequest.getSpecialty());
        Clinic clinic = clinicService.findByName(userRequest.getClinic());
        Role role = roleService.findByDescription("DOCTOR");

        DoctorInfo doctorInfo = DoctorInfo.builder()
                .firstName(userRequest.getFirstName())
                .lastName(userRequest.getLastName())
                .phoneNumber(userRequest.getPhoneNumber())
                .clinic(clinic)
                .specialty(specialty)
                .address(userRequest.getAddress())
                .birthDate(userRequest.getBirthDate())
                .build();

        Doctor doctor = Doctor.doctorBuilder()
                .email(userRequest.getEmail())
                .password(passwordEncoder.encode(userRequest.getPassword()))
                .role(role)
                .build();

        doctorInfo.setDoctor(doctor);
        doctor.setDoctorInfo(doctorInfo);

        return doctorMapper.doctorToDoctorDto(doctorRepository.save(doctor));
    }

    @Override
    public List<LocalTime> getAvailableSlots(Integer doctorId, LocalDate date) {
        LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime endOfDay = date.plusDays(1).atStartOfDay();
        List<DoctorAppointment> doctorAppointments = appointmentsRepository.findByDoctor_IdAndVisitDateTimeBetween(doctorId, startOfDay, endOfDay);
        for (DoctorAppointment doctorAppointment : doctorAppointments) {
            System.out.println(doctorAppointment);
        }

        return buildListWithAvailableSlots(doctorAppointments);
    }

    private List<LocalTime> buildListWithAvailableSlots(List<DoctorAppointment> doctorAppointments) {
        LocalTime startOfDay = LocalTime.of(7, 0);
        LocalTime endOfDay = LocalTime.of(22, 0);

        List<LocalTime> allSlots = new ArrayList<>();
        for (LocalTime time = startOfDay; time.isBefore(endOfDay); time = time.plusMinutes(30)) {
            allSlots.add(time);
        }

        Set<LocalTime> busySlots = doctorAppointments.stream()
                .map(appointment -> appointment.getVisitDateTime().toLocalTime())
                .map(time -> time.minusMinutes(time.getMinute() % 30))
                .collect(Collectors.toSet());

        return allSlots.stream()
                .filter(slot -> !busySlots.contains(slot))
                .collect(Collectors.toList());
    }

    @Override
    public UserResponse updateUserInfo(UserRequest userRequest, Integer userId) {
        Doctor doctor = doctorRepository.findById(userId).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        DoctorInfo doctorInfo = doctor.getDoctorInfo();
        DoctorDto doctorDto;

        doctorInfo.setFirstName(userRequest.getFirstName());
        doctorInfo.setLastName(userRequest.getLastName());
        doctorInfo.setPhoneNumber(userRequest.getPhoneNumber());

        if (!userRequest.getEmail().equals(doctor.getEmail())) {
            doctor.setEmail(userRequest.getEmail());
            doctorDto = doctorMapper.doctorToDoctorDto(doctorRepository.save(doctor));
            AuthTokenDetails tokenDetails = authenticationService.generateAuthTokenAndUserId(doctorDto.getEmail());

            return buildResponse(tokenDetails.getToken(), doctorDto);
        }

        doctorDto = doctorMapper.doctorToDoctorDto(doctorRepository.save(doctor));

        return buildResponse(doctorDto);
    }


    public void createJs() {
        String path = "src/main/resources/static/react/src/resources/employee/doctors.js";
        List<Doctor> doctors = doctorRepository.findAll();
        List<DoctorDto> doctorDtos = doctors.stream()
                .map(doctorMapper::doctorToDoctorDto)
                .collect(Collectors.toList());

        Map<String, List<DoctorDto>> doctorsBySpecialty = doctorDtos.stream()
                .collect(Collectors.groupingBy(doctorDto -> doctorDto.getUserInfo().getSpecialty().getDescription(),
                        Collectors.toList()));

        try {
            String doctorsJson = objectMapper.writeValueAsString(doctorsBySpecialty);
            String exportStatement = "export const doctors = ";
            Files.write(Paths.get(path), (exportStatement + doctorsJson).getBytes());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public UserResponse buildResponse(DoctorDto doctorDto) {
        return UserResponse.builder()
                .role(doctorDto.getRole())
                .doctor(doctorDto)
                .build();
    }

    @Override
    public UserResponse buildResponse(String token, DoctorDto doctorDto) {
        return UserResponse.builder()
                .token(token)
                .role(doctorDto.getRole())
                .doctor(doctorDto)
                .build();
    }

    @Override
    public String getServiceName() {
        return this.SERVICE_NAME;
    }
}