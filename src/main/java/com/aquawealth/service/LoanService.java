//package com.aquawealth.service;
//
//import com.aquawealth.model.Loan;
//import com.aquawealth.repository.LoanRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.math.BigDecimal;
//@Service
//public class LoanService {
//
//    @Autowired
//    private LoanRepository loanRepository;
//
//    public Loan applyForLoan(Loan loan){
//        loan.setTermMonths(loan.getTermMonths() * 12);
//        loan.setInterestRate(loan.getCollateralDetails() != null ? 12.1 : 17);
//        return loanRepository.save(loan);
//    }
//}
package com.aquawealth.service;

import com.aquawealth.model.Loan;
import com.aquawealth.repository.LoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class LoanService {

    @Autowired
    private LoanRepository loanRepository;

    public Loan applyForLoan(Loan loan) {
        loan.setTermMonths(loan.getTermMonths());

        // Corrected interest rate logic
        if (loan.getCollateralDetails() != null && !loan.getCollateralDetails().trim().isEmpty()) {
            loan.setInterestRate(12.1); // If collateral is provided
        } else {
            loan.setInterestRate(17);   // If no collateral is provided
        }
        if (loan.getStartDate() == null) {
            loan.setStartDate(LocalDate.now());
        }
        return loanRepository.save(loan);
    }
}

