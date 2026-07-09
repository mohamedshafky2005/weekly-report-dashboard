package com.shafky.weeklyreport.controller;

import com.shafky.weeklyreport.dto.ProjectRequest;
import com.shafky.weeklyreport.entity.Project;
import com.shafky.weeklyreport.service.ProjectService;
import com.shafky.weeklyreport.repository.UserRepository;
import com.shafky.weeklyreport.service.ProjectAssignmentService;
import java.security.Principal;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ProjectController {

    private final ProjectService projectService;
    private final ProjectAssignmentService assignmentService;
    private final UserRepository userRepository;

    @GetMapping("/my")
    public List<Project> myProjects(Principal principal) {
        Long userId = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"))
                .getId();

        return assignmentService.getProjectsByUser(userId);
    }

    @PostMapping
    public Project create(@RequestBody ProjectRequest request) {
        return projectService.create(request);
    }

    @GetMapping
    public List<Project> getAll() {
        return projectService.getAll();
    }

    @PutMapping("/{id}")
    public Project update(
            @PathVariable Long id,
            @RequestBody ProjectRequest request) {

        return projectService.update(id, request);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {

        projectService.delete(id);

        return "Project Deleted Successfully";
    }
}