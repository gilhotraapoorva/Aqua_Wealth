package com.aquawealth.repository;

import com.aquawealth.model.InsuranceClaim;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

@Repository
public interface InsuranceClaimRepository extends JpaRepository<InsuranceClaim, Long> {

    @Query("SELECT COALESCE(SUM(c.claimAmount), 0) FROM InsuranceClaim c WHERE c.policy.policyId = :policyId")
    BigDecimal getTotalClaimedAmountByPolicy(@Param("policyId") Long policyId);
}
