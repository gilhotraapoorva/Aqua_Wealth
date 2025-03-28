package com.aquawealth.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name="water_meter")
public class WaterMeter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long meterId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    private String meterNumber;
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd-MM-yyyy", timezone = "UTC")
    private Date installationDate;
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd-MM-yyyy", timezone = "UTC")
    private Date lastReadingDate;
    private String status;

    public WaterMeter(){}

    public WaterMeter(Long meterId, User user, String meterNumber, Date installationDate, Date lastReadingDate, String status) {
        this.meterId = meterId;
        this.user = user;
        this.meterNumber = meterNumber;
        this.installationDate = installationDate;
        this.lastReadingDate = lastReadingDate;
        this.status = status;
    }

    public Long getMeterId() {
        return meterId;
    }

    public void setMeterId(Long meterId) {
        this.meterId = meterId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getMeterNumber() {
        return meterNumber;
    }

    public void setMeterNumber(String meterNumber) {
        this.meterNumber = meterNumber;
    }

    public Date getInstallationDate() {
        return installationDate;
    }

    public void setInstallationDate(Date installationDate) {
        this.installationDate = installationDate;
    }

    public Date getLastReadingDate() {
        return lastReadingDate;
    }

    public void setLastReadingDate(Date lastReadingDate) {
        this.lastReadingDate = lastReadingDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}

