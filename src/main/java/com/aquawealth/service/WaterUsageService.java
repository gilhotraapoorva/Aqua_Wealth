package com.aquawealth.service;


import com.aquawealth.model.WaterUsage;
import com.aquawealth.repository.WaterUsageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WaterUsageService {
    @Autowired
    private WaterUsageRepository waterUsageRepository;

    @Autowired
    private WaterCreditService waterCreditService;
    public List<WaterUsage> getAllUsageRecords() {
        return waterUsageRepository.findAll();
    }

    public WaterUsage saveUsage(WaterUsage usage) {
        //  Step 2: Automatically calculate and assign water credits
        WaterUsage savedUsage=waterUsageRepository.save(usage);
        waterCreditService.calculateAndAssignCredits(savedUsage);
        return waterUsageRepository.save(usage);
    }
}


