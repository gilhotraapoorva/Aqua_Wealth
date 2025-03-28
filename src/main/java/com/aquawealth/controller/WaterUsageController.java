package com.aquawealth.controller;

import com.aquawealth.model.WaterMeter;
import com.aquawealth.model.WaterUsage;
import com.aquawealth.repository.WaterMeterRepository;
import com.aquawealth.service.WaterUsageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController // ✅ Change to REST controller for API handling
@RequestMapping("/usage")
@CrossOrigin(origins = "http://localhost:8000")
public class WaterUsageController {

    @Autowired
    private WaterUsageService waterUsageService;

    @Autowired
    private WaterMeterRepository waterMeterRepository;

    // ✅ Fetch all usage records
    @GetMapping("/all")
    public ResponseEntity<List<Map<String, Object>>> getAllUsage() {
        List<WaterUsage> usageList = waterUsageService.getAllUsageRecords();

        List<Map<String, Object>> response = usageList.stream().map(usage -> {
            Map<String, Object> record = new HashMap<>();
            record.put("meterNumber", usage.getWaterMeter().getMeterNumber()); // ✅ Include meterNumber
            record.put("readingValue", usage.getReadingValue());
            record.put("readingDate", usage.getReadingDate());
            record.put("efficiencyScore", usage.getEfficiencyScore());
            return record;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }



    // ✅ Save new water usage
    @PostMapping("/add/{meterId}")
    public ResponseEntity<?> saveWaterUsage(
            @PathVariable("meterId") Long meterId,
            @RequestBody WaterUsage waterUsage
    ) {
        try {
            // ✅ Fetch the water meter by ID
            Optional<WaterMeter> meterOptional = waterMeterRepository.findById(meterId);
            if (meterOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Collections.singletonMap("message", "Water meter does not exist"));
            }

            WaterMeter existingMeter = meterOptional.get();

            // ✅ Set the water meter in the water usage record
            waterUsage.setWaterMeter(existingMeter);

            // ✅ Save the water usage entry
            waterUsageService.saveUsage(waterUsage);

            return ResponseEntity.ok(Collections.singletonMap("success", true));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("message", e.getMessage()));
        }
    }
}
