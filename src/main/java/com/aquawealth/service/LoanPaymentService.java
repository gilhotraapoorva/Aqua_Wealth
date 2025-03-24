package com.aquawealth.service;

import com.aquawealth.model.Loan;
import com.aquawealth.model.LoanPayment;
import com.aquawealth.repository.LoanPaymentRepository;
import com.aquawealth.repository.LoanRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class LoanPaymentService {

    @Autowired
    private LoanRepository loanRepository;

    @Autowired
    private LoanPaymentRepository loanPaymentRepository;

    public LoanPayment makePayment(Long loanId,BigDecimal amount, String paymentType){
        Optional<Loan> loanOpt = loanRepository.findById(loanId);
        if (loanOpt.isEmpty()) {
            throw new RuntimeException("Loan not found");
        }
        LoanPayment payment = new LoanPayment();
        payment.setLoan(loanOpt.get());
        payment.setAmount(amount);
        payment.setPaymentType(paymentType);

        return loanPaymentRepository.save(payment);
    }
//    public BigDecimal getPendingAmount(Long loanId) {
//        Optional<Loan> loanOpt = loanRepository.findById(loanId);
//        if (loanOpt.isEmpty()) {
//            throw new RuntimeException("Loan not found");
//        }
//        Loan loan = loanOpt.get();
//
//        // Get all payments made
//        List<LoanPayment> payments = loanPaymentRepository.findByLoan_LoanId(loanId);
//        BigDecimal totalPaid = payments.stream().map(LoanPayment::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add);
//
//        return loan.getAmount().subtract(totalPaid);
//    }
//public BigDecimal getPendingAmount(Long loanId) {
//    Optional<Loan> loanOpt = loanRepository.findById(loanId);
//    if (loanOpt.isEmpty()) {
//        throw new RuntimeException("Loan not found");
//    }
//    Loan loan = loanOpt.get();
//
//    // BUSINESS RULE: 17% if no collateral, 12.1% if collateral exists
//    BigDecimal annualRate;
//    if (loan.getCollateralDetails() == null || loan.getCollateralDetails().trim().isEmpty()) {
//        annualRate = new BigDecimal("17.0"); // Higher rate for no collateral
//    } else {
//        annualRate = new BigDecimal("12.1"); // Lower rate with collateral
//    }
//
//    // Monthly rate calculation (annualRate / 12 / 100)
//    BigDecimal monthlyRate = annualRate.divide(new BigDecimal("1200"), 10, RoundingMode.HALF_UP);
//
//    BigDecimal principal = loan.getAmount();
//    int termMonths = loan.getTermMonths();
//
//    // Compound interest formula: A = P(1 + r)^n
//    BigDecimal totalAmount = principal.multiply(
//            BigDecimal.ONE.add(monthlyRate).pow(termMonths)
//    ).setScale(2, RoundingMode.HALF_UP);
//
//    // Subtract payments made
//    List<LoanPayment> payments = loanPaymentRepository.findByLoan_LoanId(loanId);
//    BigDecimal totalPaid = payments.stream()
//            .map(LoanPayment::getAmount)
//            .reduce(BigDecimal.ZERO, BigDecimal::add);
//
//    return totalAmount.subtract(totalPaid).max(BigDecimal.ZERO);
//}
//public BigDecimal getPendingAmount(Long loanId) {
//    Optional<Loan> loanOpt = loanRepository.findById(loanId);
//    if (loanOpt.isEmpty()) {
//        throw new RuntimeException("Loan not found");
//    }
//    Loan loan = loanOpt.get();
//
//    // Use the interest rate stored in the Loan object
//    BigDecimal annualRate = BigDecimal.valueOf(loan.getInterestRate());
//
//    // Convert annual rate from percentage to decimal (e.g., 17% → 0.17)
//    BigDecimal rateDecimal = annualRate.divide(new BigDecimal("100"), 10, RoundingMode.HALF_UP);
//
//    BigDecimal principal = loan.getAmount();
//
//    // Convert months to years (since we are calculating yearly compound interest)
//    int termYears = loan.getTermMonths() / 12;
//
//    // Compound interest formula: A = P * (1 + r)^t
//    BigDecimal totalAmount = principal.multiply(
//            BigDecimal.ONE.add(rateDecimal).pow(termYears)
//    ).setScale(2, RoundingMode.HALF_UP);
//
//    // Get total payments made
//    List<LoanPayment> payments = loanPaymentRepository.findByLoan_LoanId(loanId);
//    BigDecimal totalPaid = payments.stream()
//            .map(LoanPayment::getAmount)
//            .reduce(BigDecimal.ZERO, BigDecimal::add);
//
//    // Calculate pending amount (ensure it never goes negative)
//    return totalAmount.subtract(totalPaid).max(BigDecimal.ZERO);
//}

    public Map<String, BigDecimal> getLoanStatus(Long loanId) {
        Optional<Loan> loanOpt = loanRepository.findById(loanId);
        if (loanOpt.isEmpty()) {
            throw new RuntimeException("Loan not found");
        }
        Loan loan = loanOpt.get();

        BigDecimal annualRate = BigDecimal.valueOf(loan.getInterestRate());
        BigDecimal rateDecimal = annualRate.divide(new BigDecimal("100"), 10, RoundingMode.HALF_UP);
        BigDecimal principal = loan.getAmount();
        int termYears = loan.getTermMonths() / 12;

        // Compound Interest Calculation
        BigDecimal totalAmount = principal.multiply(
                BigDecimal.ONE.add(rateDecimal).pow(termYears)
        ).setScale(2, RoundingMode.HALF_UP);

        // Get total payments made
        List<LoanPayment> payments = loanPaymentRepository.findByLoan_LoanId(loanId);
        BigDecimal totalPaid = payments.stream()
                .map(LoanPayment::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Calculate pending amount (with interest)
        BigDecimal pendingAmount = totalAmount.subtract(totalPaid).max(BigDecimal.ZERO);

        // Calculate remaining loan (original amount minus payments made)
        BigDecimal remainingLoan = principal.subtract(totalPaid).max(BigDecimal.ZERO);

        // Prepare response map
        Map<String, BigDecimal> loanStatus = new HashMap<>();
        loanStatus.put("pendingAmount", pendingAmount);
        loanStatus.put("remainingLoan", remainingLoan);
        return loanStatus;
    }



    public List<LoanPayment> getPaymentsByLoanId(Long loanId) {
        return loanPaymentRepository.findByLoan_LoanId(loanId);
    }

}
