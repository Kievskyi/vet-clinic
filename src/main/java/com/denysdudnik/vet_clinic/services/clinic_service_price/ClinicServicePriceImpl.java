package com.denysdudnik.vet_clinic.services.clinic_service_price;

import com.denysdudnik.vet_clinic.entity.ServicePrice;
import com.denysdudnik.vet_clinic.repository.ServicePriceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClinicServicePriceImpl implements ClinicServicePrice{
    private final ServicePriceRepository priceRepository;

    @Override
    public List<ServicePrice> findAll() {
        return priceRepository.findAll();
    }

    @Override
    public ServicePrice findByDescription(String description) {
        return priceRepository.findByDescription(description).orElseThrow(() -> new RuntimeException("No price found for description: " + description));
    }

    @Override
    public Float getSumByDescription(List<String> descriptions) {
        return priceRepository.getSumByDescription(descriptions);
    }
}
