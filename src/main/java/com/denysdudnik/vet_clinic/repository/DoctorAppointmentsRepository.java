package com.denysdudnik.vet_clinic.repository;

import com.denysdudnik.vet_clinic.entity.DoctorAppointment;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface DoctorAppointmentsRepository extends JpaRepository<DoctorAppointment, Integer> {

    List<DoctorAppointment> findByDoctor_IdAndVisitDateTimeBetween(Integer id, LocalDateTime visitDateTimeStart, LocalDateTime visitDateTimeEnd);

    @EntityGraph(attributePaths = {
            "customerVisit",
            "pet",
            "doctor.doctorInfo.clinic",
            "doctor.doctorInfo.specialty",
            "customerVisit.petServices"
    })
    @Query("SELECT da FROM DoctorAppointment da " +
            "JOIN FETCH da.doctor d " +
            "JOIN FETCH d.doctorInfo di " +
            "JOIN FETCH di.clinic c " +
            "JOIN FETCH di.specialty s " +
            "LEFT JOIN FETCH da.customerVisit cv " +
            "LEFT JOIN FETCH cv.petServices ps " + // Добавлено
            "LEFT JOIN FETCH cv.pet cp " +
            "LEFT JOIN FETCH da.pet dp " +
            "WHERE da.doctor.id = ?1")
    List<DoctorAppointment> findAllByUserId(Integer id);
}
