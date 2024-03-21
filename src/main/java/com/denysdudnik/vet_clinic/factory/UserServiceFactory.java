package com.denysdudnik.vet_clinic.factory;

import com.denysdudnik.vet_clinic.services.user_service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class UserServiceFactory {
    private final Map<String, UserService> userServiceMap;

    @Autowired
    public UserServiceFactory(Set<UserService> services) {
        userServiceMap = services.stream().collect(Collectors.toMap(
                service -> service.getClass().getSimpleName().toUpperCase(),
                Function.identity()
        ));
    }

    public UserService getUserService(String type) {
        return Optional.ofNullable(userServiceMap.get(type))
                .orElseThrow(() -> new IllegalArgumentException("Invalid role: " + type));
    }
}
