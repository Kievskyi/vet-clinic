package com.denysdudnik.vet_clinic.services.role;

import com.denysdudnik.vet_clinic.entity.Role;
import com.denysdudnik.vet_clinic.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService{
    private final RoleRepository roleRepository;

    @Override
    public Role findByDescription(String description) {
        return roleRepository.findByDescription(description);
    }
}
