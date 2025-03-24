package com.aquawealth.service;

import com.aquawealth.model.ClaimStatus;
import com.aquawealth.model.InsuranceClaim;
import com.aquawealth.model.InsurancePolicy;
import com.aquawealth.repository.InsuranceClaimRepository;
import com.aquawealth.repository.InsurancePolicyRepository;
import com.aquawealth.util.WeatherAPIUtil;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.Optional;
import java.util.List;

@Service
public class InsuranceClaimService {

    @Autowired
    private InsuranceClaimRepository claimRepository;

    @Autowired
    private InsurancePolicyRepository policyRepository;

    @Autowired
    private WeatherAPIUtil weatherAPIUtil;

    public List<InsuranceClaim> getAllClaims() {
        return claimRepository.findAll();
    }

    @Transactional
    public String processClaim(String governmentId, String city, LocalDate date, BigDecimal claimAmount) {
        Optional<InsurancePolicy> policyOpt = policyRepository.findByGovernmentId(governmentId.trim());

        if (policyOpt.isEmpty()) {
            return "Claim Rejected: No active insurance policy found.";
        }

        InsurancePolicy policy = policyOpt.get();

        // Ensure coverageAmount is a BigDecimal
        BigDecimal coverageAmount = policy.getCoverageAmount();
        if (coverageAmount == null) {
            return "Claim Rejected: Policy coverage amount is missing.";
        }

        // Calculate the total claimed amount so far
        BigDecimal totalClaimed = claimRepository.getTotalClaimedAmountByPolicy(policy.getPolicyId());
        if (totalClaimed == null) {
            totalClaimed = BigDecimal.ZERO;
        }

        // Calculate the available claimable amount
        BigDecimal availableAmount = coverageAmount.subtract(totalClaimed);

        // Ensure the requested claim does not exceed the available amount
        if (claimAmount.compareTo(availableAmount) > 0) {
            return "Claim Rejected: Claim amount exceeds available coverage.";
        }

        // Save the new claim
        InsuranceClaim claim = new InsuranceClaim();
        claim.setPolicy(policy);
        claim.setClaimAmount(claimAmount);
        claim.setClaimDate(Date.from(date.atStartOfDay(ZoneId.systemDefault()).toInstant()));
        claim.setIncidentDate(claim.getClaimDate());
        claim.setPlace(city);
        claim.setStatus(ClaimStatus.APPROVED);

        claimRepository.save(claim);

        return "Claim Approved: Severe weather detected in " + city + " on " + date;
    }

}
