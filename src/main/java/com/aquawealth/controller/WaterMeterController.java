package com.aquawealth.controller;

import com.aquawealth.model.User;
import com.aquawealth.model.WaterMeter;
import com.aquawealth.repository.WaterMeterRepository;
import com.aquawealth.service.UserService;
import com.aquawealth.service.WaterMeterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/meters")
@CrossOrigin(origins = "http://localhost:8000")
public class WaterMeterController {

    @Autowired
    private WaterMeterService waterMeterService;

    @Autowired
    private UserService userService;

    @Autowired
    private WaterMeterRepository waterMeterRepository;

    // ✅ Fetch all meters
    @GetMapping("/all")
    public ResponseEntity<List<WaterMeter>> getAllMeters() {
        return ResponseEntity.ok(waterMeterService.getAllMeters());
    }

    // ✅ Fetch single meter
    @GetMapping("/{meterId}")
    public ResponseEntity<?> getMeter(@PathVariable Long meterId) {
        Optional<WaterMeter> meter = waterMeterRepository.findById(meterId);

        if (meter.isPresent()) {
            return ResponseEntity.ok(meter.get()); // ✅ Return the actual WaterMeter object
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("message", "Meter not found")); // ✅ Return JSON error response
        }
    }

    // ✅ Add a new water meter with user validation
    @PostMapping("/save")
    public ResponseEntity<?> saveMeter(@RequestBody WaterMeter waterMeter) {
        try {
            // Extract user details
            String email = waterMeter.getUser().getEmail();
            String name = waterMeter.getUser().getName();
            String governmentId = waterMeter.getUser().getGovernmentId();
            String meterNumber = waterMeter.getMeterNumber();

            // ✅ Check if user exists with exact matching details
            Optional<User> existingUser = waterMeterService.validateUser(name, email, governmentId);

            if (existingUser.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Collections.singletonMap("message", "Invalid user details"));
            }

            // ✅ Check if the meter already exists
            if (waterMeterRepository.findByMeterNumber(meterNumber).isPresent()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Collections.singletonMap("message", "Water meter already registered"));
            }

            // ✅ Assign user and save meter
            waterMeter.setUser(existingUser.get());
            WaterMeter savedMeter = waterMeterService.saveMeter(waterMeter);
            return ResponseEntity.ok(savedMeter);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("message", e.getMessage()));
        }
    }

    // ✅ Delete a water meter
    @DeleteMapping("/{meterId}")
    public ResponseEntity<?> deleteMeter(@PathVariable Long meterId) {
        if (!waterMeterRepository.existsById(meterId)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("message", "Meter not found"));
        }
        waterMeterService.deleteMeter(meterId);
        return ResponseEntity.ok(Collections.singletonMap("message", "Meter deleted successfully"));
    }
}
