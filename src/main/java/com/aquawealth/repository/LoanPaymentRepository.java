package com.aquawealth.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.aquawealth.model.LoanPayment;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoanPaymentRepository extends JpaRepository<LoanPayment, Long> {
    List<LoanPayment> findByLoan_LoanId(Long loanId);
}