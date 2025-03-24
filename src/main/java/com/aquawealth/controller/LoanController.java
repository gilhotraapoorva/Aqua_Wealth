package com.aquawealth.controller;

import com.aquawealth.model.Loan;
import com.aquawealth.model.User;
import com.aquawealth.service.LoanService;
import com.aquawealth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;

@RestController
@RequestMapping("/loans")
public class LoanController {

    @Autowired
    private LoanService loanService;

    @Autowired
    private UserService userService;

    @PostMapping("/apply")
    public ResponseEntity<?> applyForLoan(@RequestBody Loan loan) {
        try {
            if (loan.getUser() == null) {
                return ResponseEntity.badRequest().body("User details are missing.");
            }

            User loanUser = loan.getUser();
            if (loanUser.getGovernmentId() == null || loanUser.getName() == null || loanUser.getEmail() == null) {
                return ResponseEntity.badRequest().body("Missing user information.");
            }

            User existingUser = userService.getUserByGovernmentId(loanUser.getGovernmentId());
            User user = Optional.ofNullable(existingUser).orElseGet(() -> userService.createUser(loanUser));
            loan.setUser(user);

            if (loan.getAmount() == null || loan.getAmount().compareTo(BigDecimal.ZERO) <= 0) {
                return ResponseEntity.badRequest().body("Invalid loan amount.");
            }

            System.out.println("Received Loan Term Months: " + loan.getTermMonths());

            if (loan.getTermMonths() < 12 || loan.getTermMonths() > 60) {
                return ResponseEntity.badRequest().body("Invalid term. Must be between 12 and 60 months.");
            }

            if (loan.getStartDate() == null) {
                loan.setStartDate(LocalDate.now());
            }

            Loan savedLoan = loanService.applyForLoan(loan);
            return ResponseEntity.ok(savedLoan);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error applying for loan.");
        }
    }
}

//package com.aquawealth.controller;
//
//import com.aquawealth.model.Loan;
//import com.aquawealth.model.User;
//import com.aquawealth.service.LoanService;
//import com.aquawealth.service.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.math.BigDecimal;
//import java.time.LocalDate;
//import java.util.Optional;
//
//@RestController
//@RequestMapping("/loans")
//public class LoanController {
//
//    @Autowired
//    private LoanService loanService;
//
//    @Autowired
//    private UserService userService;
//
//    @PostMapping("/apply")
//    public ResponseEntity<?> applyForLoan(@RequestBody Loan loan) {
//        try {
//            if (loan.getUser() == null) {
//                return ResponseEntity.badRequest().body("User details are missing in the request.");
//            }
//
//            User loanUser = loan.getUser();
//            if (loanUser.getGovernmentId() == null || loanUser.getName() == null || loanUser.getEmail() == null) {
//                return ResponseEntity.badRequest().body("Missing user information: governmentId, name, or email.");
//            }
//
//            User existingUser = userService.getUserByGovernmentId(loanUser.getGovernmentId());
//            User user = Optional.ofNullable(existingUser).orElseGet(() -> userService.createUser(loanUser));
//
//            loan.setUser(user);
//
//            if (loan.getAmount() == null || loan.getAmount().compareTo(BigDecimal.ZERO) <= 0) {
//                return ResponseEntity.badRequest().body("Invalid loan amount.");
//            }
//
//            // Ensure startDate is set to current date if null
//            if (loan.getStartDate() == null) {
//                loan.setStartDate(LocalDate.now());
//            }
//
//            Loan savedLoan = loanService.applyForLoan(loan);
//            return ResponseEntity.ok(savedLoan);
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.internalServerError().body("Error applying for loan: " + e.getMessage());
//        }
//    }
//}
