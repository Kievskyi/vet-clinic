package com.denysdudnik.vet_clinic.repository;

import com.denysdudnik.vet_clinic.entity.DoctorAppointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface DoctorAppointmentsRepository extends JpaRepository<DoctorAppointment, Integer> {

    List<DoctorAppointment> findByDoctor_IdAndVisitDateTimeBetween(Integer id, LocalDateTime visitDateTimeStart, LocalDateTime visitDateTimeEnd);

    @Query("select d from DoctorAppointment d where d.doctor.id = ?1")
    List<DoctorAppointment> findAllByUserId(Integer id);
}
