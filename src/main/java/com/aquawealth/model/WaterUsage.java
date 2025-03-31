package com.aquawealth.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name="water-usage")
public class WaterUsage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long usageId;

    @ManyToOne
    @JoinColumn(name = "meter_id", nullable = false)
    private WaterMeter waterMeter;

    private Double readingValue;
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd-MM-yyyy", timezone = "UTC")
    private Date readingDate;
//    private Double efficiencyScore;

    public WaterUsage(){}

    public WaterUsage(Long usageId, WaterMeter waterMeter, Double readingValue, Date readingDate, Double efficiencyScore) {
        this.usageId = usageId;
        this.waterMeter = waterMeter;
        this.readingValue = readingValue;
        this.readingDate = readingDate;
//        this.efficiencyScore = efficiencyScore;
    }

    public Long getUsageId() {
        return usageId;
    }

    public void setUsageId(Long usageId) {
        this.usageId = usageId;
    }

    public WaterMeter getWaterMeter() {
        return waterMeter;
    }

    public void setWaterMeter(WaterMeter waterMeter) {
        this.waterMeter = waterMeter;
    }

    public Double getReadingValue() {
        return readingValue;
    }

    public void setReadingValue(Double readingValue) {
        this.readingValue = readingValue;
    }

    public Date getReadingDate() {
        return readingDate;
    }

    public void setReadingDate(Date readingDate) {
        this.readingDate = readingDate;
    }

//    public Double getEfficiencyScore() {
//        return efficiencyScore;
//    }
//
//    public void setEfficiencyScore(Double efficiencyScore) {
//        this.efficiencyScore = efficiencyScore;
//    }
}

