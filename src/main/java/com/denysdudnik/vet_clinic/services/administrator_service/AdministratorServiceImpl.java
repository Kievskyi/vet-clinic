package com.denysdudnik.vet_clinic.services.administrator_service;

import com.denysdudnik.vet_clinic.dto.AdministratorDto;
import com.denysdudnik.vet_clinic.dto.AuthTokenDetails;
import com.denysdudnik.vet_clinic.dto.UserRequest;
import com.denysdudnik.vet_clinic.dto.UserResponse;
import com.denysdudnik.vet_clinic.entity.Administrator;
import com.denysdudnik.vet_clinic.entity.AdministratorInfo;
import com.denysdudnik.vet_clinic.mappers.AdministratorMapper;
import com.denysdudnik.vet_clinic.repository.AdministratorRepository;
import com.denysdudnik.vet_clinic.services.UserInfoService;
import com.denysdudnik.vet_clinic.services.authentication_service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdministratorServiceImpl implements AdministratorService, UserInfoService {
    private final String SERVICE_NAME = "ADMINISTRATOR";
    private final AdministratorRepository administratorRepository;
    private final AdministratorMapper administratorMapper;
    private final AuthenticationService authenticationService;


    @Override
    public AdministratorDto findById(Integer id) {
        return administratorMapper.administratorToAdministratorDto(
                administratorRepository
                        .findById(id)
                        .orElseThrow(() -> new IllegalArgumentException("Invalid administrator id: " + id))
        );
    }

    @Override
    public UserResponse updateUserInfo(UserRequest userRequest, Integer userId) {
        Administrator administrator = administratorRepository.findById(userId).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        AdministratorInfo administratorInfo = administrator.getAdministratorInfo();
        AdministratorDto administratorDto;

        administratorInfo.setFirstName(userRequest.getFirstName());
        administratorInfo.setLastName(userRequest.getLastName());
        administratorInfo.setPhoneNumber(userRequest.getPhoneNumber());

        if (!userRequest.getEmail().equals(administrator.getEmail())) {
            administrator.setEmail(userRequest.getEmail());
            administratorDto = administratorMapper.administratorToAdministratorDto(administratorRepository.save(administrator));
            AuthTokenDetails tokenDetails = authenticationService.generateAuthTokenAndUserId(administratorDto.getEmail());

            return buildResponse(tokenDetails.getToken(), administratorDto);
        }

        administratorDto = administratorMapper.administratorToAdministratorDto(administratorRepository.save(administrator));

        return buildResponse(administratorDto);
    }

    @Override
    public UserResponse buildResponse(AdministratorDto administratorDto) {
        return UserResponse.builder()
                .role(administratorDto.getRole())
                .administrator(administratorDto)
                .build();
    }

    @Override
    public UserResponse buildResponse(String token, AdministratorDto administratorDto) {
        return UserResponse.builder()
                .token(token)
                .role(administratorDto.getRole())
                .administrator(administratorDto)
                .build();
    }

    @Override
    public String getServiceName() {
        return this.SERVICE_NAME;
    }
}
