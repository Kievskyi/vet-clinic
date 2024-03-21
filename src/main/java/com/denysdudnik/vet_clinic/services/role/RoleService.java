package com.denysdudnik.vet_clinic.services.role;

import com.denysdudnik.vet_clinic.entity.Role;

public interface RoleService {

    Role findByDescription(String description);
}
