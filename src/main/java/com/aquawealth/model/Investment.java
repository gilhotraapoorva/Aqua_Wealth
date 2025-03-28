package com.aquawealth.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "investments")
public class Investment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long investId;
    //CURRENTLY NO USER CLASS SO NOT LINKED >>ELSE ITS FOREIGN KEY

    @ManyToOne
    @JoinColumn(name = "user_id") // Ensure correct reference
    private User user;
    private Double buyRate;
    //@Column(nullable = true)//TEMPORARRY
    private int units;

    //@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd-MM-yyyy", timezone = "UTC")
    private Date investmentDate;
    // Store as a string in the database
    private String status;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;  // Link investment to a project
    public Investment() {}

    public Investment(Long investId, User user, Double buyRate, int units, Date investmentDate, String status, Project project) {
        this.investId = investId;
        this.user = user;
        this.buyRate = buyRate;
        this.units = units;
        this.investmentDate = investmentDate;
        this.status = status;
        this.project = project;
    }

    public Long getInvestId() {
        return investId;
    }

    public void setInvestId(Long investId) {
        this.investId = investId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Double getBuyRate() {
        return buyRate;
    }

    public void setBuyRate(Double buyRate) {
        this.buyRate = buyRate;
    }

    public int getUnits() {
        return units;
    }

    public void setUnits(int units) {
        this.units = units;
    }

    public Date getInvestmentDate() {
        return investmentDate;
    }

    public void setInvestmentDate(Date investmentDate) {
        this.investmentDate = investmentDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }
}
