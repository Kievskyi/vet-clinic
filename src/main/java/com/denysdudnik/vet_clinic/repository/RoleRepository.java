package com.denysdudnik.vet_clinic.repository;

import com.denysdudnik.vet_clinic.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Integer> {

    Role findByDescription(String description);
}
