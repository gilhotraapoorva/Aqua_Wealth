package com.aquawealth.repository;


import com.aquawealth.model.WaterUsage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WaterUsageRepository extends JpaRepository<WaterUsage, Long> {
    Optional<WaterUsage> findTopByWaterMeterMeterIdOrderByReadingDateDesc(Long meterId);
}

