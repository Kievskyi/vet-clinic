package com.denysdudnik.vet_clinic.services.user_service;

import com.denysdudnik.vet_clinic.entity.User;
import com.denysdudnik.vet_clinic.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    public User findUserById(User user) {

        return userRepository.findById(user.getId()).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Override
    public User findUserByEmail(String email) {
        return userRepository.findUserByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
}
