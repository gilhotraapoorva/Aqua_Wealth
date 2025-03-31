package com.aquawealth.service;

import com.aquawealth.model.WaterCredit;
import com.aquawealth.model.WaterUsage;
import com.aquawealth.repository.WaterCreditRepository;
import com.aquawealth.repository.WaterUsageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class WaterCreditService {
    private static final BigDecimal BASELINE_USAGE = BigDecimal.valueOf(200); // Baseline in L/day
    private static final BigDecimal CREDIT_RATE = BigDecimal.valueOf(10);


    @Autowired
    private WaterCreditRepository waterCreditRepository;

    @Autowired
    private WaterUsageRepository waterUsageRepository;

    public List<WaterCredit> getAllCredits() {
        return waterCreditRepository.findAll();
    }

    public WaterCredit getCreditById(Long id) {
        return waterCreditRepository.findById(id).orElse(null);
    }

    public WaterCredit saveCredit(WaterCredit credit) {
        return waterCreditRepository.save(credit);
    }

    public void deleteCredit(Long id) {
        waterCreditRepository.deleteById(id);
    }

    public WaterCredit calculateAndAssignCredits(WaterUsage usage) {
        // Fetch latest water usage for the same meter
        WaterUsage previousUsage = waterUsageRepository
                .findTopByWaterMeterMeterIdOrderByReadingDateDesc(usage.getWaterMeter().getMeterId())
                .orElse(null);

        long daysElapsed = 1;

        if (previousUsage != null) {
            // Calculate days between last usage and new usage (in Date format)
            daysElapsed = TimeUnit.MILLISECONDS.toDays(
                    usage.getReadingDate().getTime() - previousUsage.getReadingDate().getTime()
            );
        } else {
            //  No previous usage, use meter installation date
            Date installationDate = usage.getWaterMeter().getInstallationDate();
            if (installationDate != null) {
                daysElapsed = TimeUnit.MILLISECONDS.toDays(
                        usage.getReadingDate().getTime() - installationDate.getTime()
                );
            }
        }
        daysElapsed = Math.max(daysElapsed, 1); // Ensure at least 1 day

        //  Calculate Average Daily Usage
        BigDecimal dailyUsage = BigDecimal.valueOf(usage.getReadingValue())
                .divide(BigDecimal.valueOf(daysElapsed), 2, RoundingMode.HALF_UP);

        //  Prevent divide-by-zero errors
        if (dailyUsage.compareTo(BigDecimal.ZERO) == 0) {
            dailyUsage = BigDecimal.ONE;
        }

        //  Calculate Efficiency Score (Capped at 200%)
        BigDecimal efficiencyScore = BASELINE_USAGE
                .divide(dailyUsage, 2, RoundingMode.HALF_UP)
                .multiply(BigDecimal.valueOf(100))
                .min(BigDecimal.valueOf(200)); // Cap at 200%

        //  Calculate Water Credits (Only if Efficiency > 100%)
        BigDecimal creditsEarned = BigDecimal.ZERO;
        if (efficiencyScore.compareTo(BigDecimal.valueOf(100)) > 0) {
            creditsEarned = efficiencyScore.subtract(BigDecimal.valueOf(100))
                    .multiply(CREDIT_RATE)
                    .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
        }

        //  Generate `Date` for Earning and Expiry Dates
        Date earningDate = new Date();
        Date expiryDate = new Date(System.currentTimeMillis() + TimeUnit.DAYS.toMillis(180));

        //  Create and Save Water Credit Entry
        WaterCredit credit = WaterCredit.builder()
                .user(usage.getWaterMeter().getUser())
                .creditsEarned(creditsEarned.doubleValue())
                .creditsUsed(0.0)
                .waterUsage(usage)
                .earningDate(earningDate)
                .expiryDate(expiryDate)
                .status("ACTIVE")
                .build();

        return waterCreditRepository.save(credit);
    }



}