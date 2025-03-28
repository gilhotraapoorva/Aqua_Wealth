package com.aquawealth.model;

import jakarta.persistence.*;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long projectId;
    private String projectName;

    private String projectType;


    private String riskLevel;
    private Double currRate;
    private String location;
    private Double targetAmount;
    private Double currAmount;

//    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
//    private List<Investment> investments = new ArrayList<>();

    public Project() {}

    public Project(Long projectId, String projectName, String projectType, String riskLevel, Double currRate, String location, Double targetAmount, Double currAmount) {
        this.projectId = projectId;
        this.projectName = projectName;
        this.projectType = projectType;
        this.riskLevel = riskLevel;
        this.currRate = currRate;
        this.location = location;
        this.targetAmount = targetAmount;
        this.currAmount = currAmount;
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getProjectType() {
        return projectType;
    }

    public void setProjectType(String projectType) {
        this.projectType = projectType;
    }

    public String getRiskLevel() {
        return riskLevel;
    }

    public void setRiskLevel(String riskLevel) {
        this.riskLevel = riskLevel;
    }

    public Double getCurrRate() {
        return currRate;
    }

    public void setCurrRate(Double currRate) {
        this.currRate = currRate;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Double getTargetAmount() {
        return targetAmount;
    }

    public void setTargetAmount(Double targetAmount) {
        this.targetAmount = targetAmount;
    }

    public Double getCurrAmount() {
        return currAmount;
    }

    public void setCurrAmount(Double currAmount) {
        this.currAmount = currAmount;
    }
}
