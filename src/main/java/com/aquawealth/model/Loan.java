package com.aquawealth.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "loans")
public class Loan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long loanId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    private double interestRate;

    @Column(nullable = false) // Ensure it's not null in DB
    private int termMonths;

    @Column(length = 255)
    private String purpose;

    @Column(length = 255)
    private String collateralDetails;

    @Column(nullable = false)
    private LocalDate startDate = LocalDate.now();
}

