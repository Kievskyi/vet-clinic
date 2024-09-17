package com.denysdudnik.vet_clinic.services.user_service;

import com.denysdudnik.vet_clinic.dto.UserDto;
import com.denysdudnik.vet_clinic.entity.Role;
import org.springframework.data.jpa.repository.EntityGraph;

public interface UserService {
    @EntityGraph(type = EntityGraph.EntityGraphType.FETCH, value = "user-entity-graph")
    UserDto findById(Integer userId);

    Role findRoleByUserId(Integer userId);
}
