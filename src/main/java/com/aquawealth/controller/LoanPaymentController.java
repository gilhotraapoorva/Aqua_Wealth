package com.aquawealth.controller;

import com.aquawealth.model.LoanPayment;
import com.aquawealth.service.LoanPaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:8000") // Allow frontend requests
@RestController
@RequestMapping("/payments")
public class LoanPaymentController {

    @Autowired
    private LoanPaymentService loanPaymentService;

    @PostMapping("/process-payment")
    public Map<String, Object> processPayment(
            @RequestParam Long loanId,
            @RequestParam BigDecimal amount,
            @RequestParam String paymentType
    ) {
        Map<String, Object> response = new HashMap<>();
        try {
            LoanPayment payment = loanPaymentService.makePayment(loanId, amount, paymentType);
            response.put("success", true);
            response.put("message", "Payment processed successfully!");
            response.put("payment", payment);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Payment failed: " + e.getMessage());
        }
        return response;
    }

@GetMapping("/loan-status")
public Map<String, Object> getLoanStatus(@RequestParam Long loanId) {
    Map<String, Object> response = new HashMap<>();
    try {
        Map<String, BigDecimal> loanStatus = loanPaymentService.getLoanStatus(loanId);
        response.put("success", true);
        response.put("pendingAmount", loanStatus.get("pendingAmount"));
        response.put("remainingLoan", loanStatus.get("remainingLoan"));
    } catch (Exception e) {
        response.put("success", false);
        response.put("message", "Error fetching loan status: " + e.getMessage());
    }
    return response;
}

    @GetMapping("/payment-history")
    public Map<String, Object> getPaymentHistory(@RequestParam Long loanId) {
        Map<String, Object> response = new HashMap<>();
        try {
            List<LoanPayment> paymentHistory = loanPaymentService.getPaymentsByLoanId(loanId);
            response.put("success", true);
            response.put("paymentHistory", paymentHistory);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error fetching payment history: " + e.getMessage());
        }
        return response;
    }
}
