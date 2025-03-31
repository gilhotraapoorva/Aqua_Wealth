
package com.aquawealth.controller;

import com.aquawealth.model.Investment;
import com.aquawealth.model.Project;
import com.aquawealth.model.User;
import com.aquawealth.repository.ProjectRepository;
import com.aquawealth.repository.UserRepository;
import com.aquawealth.service.InvestmentService;
import com.aquawealth.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:8000")
@RestController
@RequestMapping("/api/investments")
public class InvestmentController {

    @Autowired
    private InvestmentService investmentService;

    @Autowired
    private ProjectRepository projectRepository;


    @Autowired
    private ProjectService projectService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/all")
    public ResponseEntity<List<Investment>> getAllInvestments() {
        List<Investment> investments = investmentService.getAllInvestment();
        return ResponseEntity.ok(investments);  // Returns JSON list of investments
    }


    @GetMapping("/form/{projectId}")
    public ResponseEntity<?> showInvestmentForm(@PathVariable("projectId") Long projectId) {
        return ResponseEntity.ok(Collections.singletonMap("projectId", projectId));
    }


    @PostMapping("/form/{projectId}/save")
    public ResponseEntity<?> saveInvestment(
            @PathVariable("projectId") Long projectId,
            @RequestBody Investment investment
    ) {
        try {
            String email = investment.getUser().getEmail();
            String username = investment.getUser().getName();

            Optional<User> existingUser = userRepository.findByEmail(email);
            if (existingUser.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Collections.singletonMap("message", "User does not exist"));
            }

            if (!existingUser.get().getName().equals(username)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Collections.singletonMap("message", "Username does not match the registered email"));
            }

            Optional<Project> projectOptional = projectRepository.findById(projectId);
            if (projectOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Collections.singletonMap("message", "Project does not exist"));
            }

            Project existingProject = projectOptional.get();
            investment.setUser(existingUser.orElse(null));
            investment.setProject(existingProject);

            investmentService.saveInvestment(investment);
            return ResponseEntity.ok(Collections.singletonMap("success", true));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("message", e.getMessage()));
        }
    }
}