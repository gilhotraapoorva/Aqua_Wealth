package com.aquawealth.controller;

import com.aquawealth.model.Project;
import com.aquawealth.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
@CrossOrigin(origins = "http://localhost:8000")
@RestController  // ✅ Now it's a Spring MVC Controller
@RequestMapping("/api/projects")  // Routes will be /projects/*
public class ProjectController {

    @Autowired
    private ProjectService projectService;


    @GetMapping("/all")
    public ResponseEntity<List<Project>> getAllProjects() {
        List<Project> projects = projectService.getAllProjects();
        return ResponseEntity.ok(projects);  // Returns JSON list of projects
    }
//    @GetMapping("/all")
//    public String getAllProjects(Model model) {
//        List<Project> projects = projectService.getAllProjects();
//        model.addAttribute("projects", projects);
//        return "project-list";  // Renders projectList.jsp
//    }

    @GetMapping("/create")
    public ResponseEntity<?> showCreateForm() {
        return ResponseEntity.ok(Collections.singletonMap("message", "Create project form endpoint"));  // ✅ JSON response
    }

    // ✅ Show Create Project Form
//    @GetMapping("/create")
//    public String showCreateForm(Model model) {
//        model.addAttribute("project", new Project());
//        return "project-form";  // Renders projectForm.jsp
//    }

    @PostMapping("/save")
    public ResponseEntity<?> saveProject(@RequestBody Project project) {
        try {
            projectService.saveProject(project);
            return ResponseEntity.ok(Collections.singletonMap("success", true));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("message", e.getMessage()));
        }
    }
//    @PostMapping("/save")
//    public ResponseEntity<?> saveProject(@RequestBody Project project) {
//        try {
//            projectService.saveProject(project);
//            return ResponseEntity.ok(Collections.singletonMap("success", true));
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(Collections.singletonMap("message", e.getMessage()));
//        }
//    }



}
