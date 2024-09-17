package com.denysdudnik.vet_clinic.services.user_service;

import com.denysdudnik.vet_clinic.dto.UserDto;
import com.denysdudnik.vet_clinic.entity.Role;
import com.denysdudnik.vet_clinic.entity.User;
import com.denysdudnik.vet_clinic.exception.NotFoundException;
import com.denysdudnik.vet_clinic.exception.UserNotFoundException;
import com.denysdudnik.vet_clinic.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    public UserDto findById(Integer userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("User not found"));

        return buildUserDto(user);
    }

    @Override
    public Role findRoleByUserId(Integer userId) {
        return userRepository.findRoleByUserId(userId).orElseThrow(() -> new NotFoundException("Role not found"));
    }

    private UserDto buildUserDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .role(user.getRole().getDescription())
                .build();
    }
}
