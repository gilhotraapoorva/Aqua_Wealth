package com.aquawealth.service;

import com.aquawealth.model.Project;
import com.aquawealth.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {
    //private final ProjectRepository projectRepository;
    @Autowired
    private ProjectRepository projectRepository;
    //public ProjectService(ProjectRepository projectRepository) {

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project getProjectById(Long id) {
        return projectRepository.findById(id).orElseThrow(() -> new RuntimeException("Project not found"));
    }

    public Project saveProject(Project project) {
        return projectRepository.save(project);
    }

    public boolean deleteProject(Long projectId) {
        Optional<Project> projectOptional = projectRepository.findById(projectId);

        if (projectOptional.isPresent()) {
            projectRepository.deleteById(projectId);
            return true;
        } else {
            return false;
        }
    }
}
