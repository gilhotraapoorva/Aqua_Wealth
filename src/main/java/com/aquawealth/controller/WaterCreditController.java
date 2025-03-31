package com.aquawealth.controller;


import com.aquawealth.model.WaterCredit;
import com.aquawealth.service.WaterCreditService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:8000") // Change to your frontend URL
@RestController
@RequestMapping("/credits")
public class WaterCreditController {
    @Autowired
    private WaterCreditService waterCreditService;

    @GetMapping("/all")
    public List<Map<String, Object>> getAllCredits() {
        List<WaterCredit> credits = waterCreditService.getAllCredits();

        return credits.stream().map(credit -> {
            Map<String, Object> creditMap = new HashMap<>();
            creditMap.put("meterNumber", credit.getWaterUsage().getWaterMeter().getMeterNumber());
            creditMap.put("creditsEarned", credit.getCreditsEarned());
            creditMap.put("earningDate", credit.getEarningDate());
            creditMap.put("expiryDate", credit.getExpiryDate());
            return creditMap;
        }).toList();
    }

    @GetMapping("/credits/{id}")
    public ResponseEntity<WaterCredit> getCreditById(@PathVariable Long id) {
        WaterCredit credit = waterCreditService.getCreditById(id);
        return credit != null ? ResponseEntity.ok(credit) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/credits/{id}")
    public ResponseEntity<Void> deleteCredit(@PathVariable Long id) {
        waterCreditService.deleteCredit(id);
        return ResponseEntity.noContent().build();
    }

}





