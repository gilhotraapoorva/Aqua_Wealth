package com.aquawealth.repository;

import com.aquawealth.model.WaterMeter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WaterMeterRepository extends JpaRepository<WaterMeter, Long> {
    Optional<WaterMeter> findByMeterNumber(String meterNumber);
//    Optional<WaterMeter> findById(Long meterId);

}

