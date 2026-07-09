package com.shafky.weeklyreport.controller;

import com.shafky.weeklyreport.dto.ProjectAssignmentRequest;
import com.shafky.weeklyreport.entity.Project;
import com.shafky.weeklyreport.entity.ProjectAssignment;
import com.shafky.weeklyreport.service.ProjectAssignmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/assignments")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ProjectAssignmentController {

    private final ProjectAssignmentService assignmentService;

    @PostMapping
    public ProjectAssignment assign(@RequestBody ProjectAssignmentRequest request) {
        return assignmentService.assign(request);
    }

    @GetMapping
    public List<ProjectAssignment> getAll() {
        return assignmentService.getAll();
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        assignmentService.delete(id);
        return "Assignment deleted successfully";
    }
}