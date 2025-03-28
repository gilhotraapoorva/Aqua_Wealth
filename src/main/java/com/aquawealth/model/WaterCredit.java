package com.aquawealth.model;


import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Builder;

import java.util.Date;

@Entity
@Builder
@Table(name="water-credit")
public class WaterCredit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long creditId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private Double creditsEarned;
    private Double creditsUsed;
    @ManyToOne
    @JoinColumn(name = "usage_id", nullable = false)
    private WaterUsage waterUsage;
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd-MM-yyyy", timezone = "UTC")
    private Date earningDate;
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd-MM-yyyy", timezone = "UTC")
    private Date expiryDate;

    private String status;

    public WaterCredit(){}

    public WaterCredit(Long creditId, User user, Double creditsEarned, Double creditsUsed, WaterUsage waterUsage, Date earningDate, Date expiryDate, String status) {
        this.creditId = creditId;
        this.user = user;
        this.creditsEarned = creditsEarned;
        this.creditsUsed = creditsUsed;
        this.waterUsage = waterUsage;
        this.earningDate = earningDate;
        this.expiryDate = expiryDate;
        this.status = status;
    }

    public Long getCreditId() {
        return creditId;
    }

    public void setCreditId(Long creditId) {
        this.creditId = creditId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Double getCreditsEarned() {
        return creditsEarned;
    }

    public void setCreditsEarned(Double creditsEarned) {
        this.creditsEarned = creditsEarned;
    }

    public Double getCreditsUsed() {
        return creditsUsed;
    }

    public void setCreditsUsed(Double creditsUsed) {
        this.creditsUsed = creditsUsed;
    }

    public WaterUsage getWaterUsage() {
        return waterUsage;
    }

    public void setWaterUsage(WaterUsage waterUsage) {
        this.waterUsage = waterUsage;
    }

    public Date getEarningDate() {
        return earningDate;
    }

    public void setEarningDate(Date earningDate) {
        this.earningDate = earningDate;
    }

    public Date getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(Date expiryDate) {
        this.expiryDate = expiryDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}

