package com.aquawealth.service;

import com.aquawealth.model.User;
import com.aquawealth.model.WaterMeter;
import com.aquawealth.repository.UserRepository;
import com.aquawealth.repository.WaterMeterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WaterMeterService {

    @Autowired
    private WaterMeterRepository waterMeterRepository;

    @Autowired
    private UserRepository userRepository;

    public List<WaterMeter> getAllMeters() {
        return waterMeterRepository.findAll();
    }

    public WaterMeter getMeterById(Long id) {
        return waterMeterRepository.findById(id).orElse(null);
    }

    public WaterMeter saveMeter(WaterMeter meter) {
        return waterMeterRepository.save(meter);
    }

    public void deleteMeter(Long id) {
        waterMeterRepository.deleteById(id);
    }

    public Optional<User> validateUser(String name, String email, String governmentId) {
        return Optional.ofNullable(userRepository.findByNameAndEmailAndGovernmentId(name, email, governmentId));
    }
}
