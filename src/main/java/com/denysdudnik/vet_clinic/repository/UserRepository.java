package com.denysdudnik.vet_clinic.repository;

import com.denysdudnik.vet_clinic.entity.Role;
import com.denysdudnik.vet_clinic.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findUserByEmail(String email);

    @Query("SELECT u.role FROM User u WHERE u.id = ?1")
    Optional<Role> findRoleByUserId(Integer userId);

    @Override
    Optional<User> findById(Integer id);
}
