package com.aquawealth.service;

import com.aquawealth.model.Investment;
import com.aquawealth.model.Project;
import com.aquawealth.repository.InvestmentRepository;
import com.aquawealth.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InvestmentService {

    @Autowired
    private InvestmentRepository investmentRepository;

    @Autowired
    private ProjectRepository projectRepository;

    public Investment saveInvestment(Long projectId, Investment investment) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        return investmentRepository.save(investment);
    }
    public List<Investment> getAllInvestment() {
        return investmentRepository.findAll();
    }
    public Investment getInvestmentById(Long investid) {
        return investmentRepository.findById(investid).orElseThrow(() -> new RuntimeException("Investment not found"));
    }
    public Investment saveInvestment(Investment investment) {
        double totalAmount = investment.getBuyRate() * investment.getUnits();

        // Fetch the associated project
        Project project = investment.getProject();
        if (project == null) {
            throw new IllegalArgumentException("Project not found for investment");
        }

        // Update the project's currAmount
        project.setCurrAmount(project.getCurrAmount() + totalAmount);

        // Save updated project
        projectRepository.save(project);

        return investmentRepository.save(investment);
    }

//    public Investment saveInvestment(Investment investment) {
//        return investmentRepository.save(investment);
//    }
}
