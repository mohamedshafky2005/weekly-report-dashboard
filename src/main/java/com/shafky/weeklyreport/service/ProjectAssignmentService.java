package com.shafky.weeklyreport.service;

import com.shafky.weeklyreport.dto.ProjectAssignmentRequest;
import com.shafky.weeklyreport.entity.Project;
import com.shafky.weeklyreport.entity.ProjectAssignment;
import com.shafky.weeklyreport.entity.User;
import com.shafky.weeklyreport.repository.ProjectAssignmentRepository;
import com.shafky.weeklyreport.repository.ProjectRepository;
import com.shafky.weeklyreport.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectAssignmentService {

    private final ProjectAssignmentRepository assignmentRepository;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;

    public ProjectAssignment assign(ProjectAssignmentRequest request) {

        if (assignmentRepository.existsByUserIdAndProjectId(
                request.getUserId(),
                request.getProjectId()
        )) {
            throw new RuntimeException("This member is already assigned to this project");
        }

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Project project = projectRepository.findById(request.getProjectId())
                .orElseThrow(() -> new RuntimeException("Project not found"));

        ProjectAssignment assignment = ProjectAssignment.builder()
                .user(user)
                .project(project)
                .assignedDate(LocalDate.now())
                .build();

        return assignmentRepository.save(assignment);
    }

    public List<ProjectAssignment> getAll() {
        return assignmentRepository.findAll();
    }

    public void delete(Long id) {
        assignmentRepository.deleteById(id);
    }

    public List<Project> getProjectsByUser(Long userId) {
        return assignmentRepository.findByUserId(userId)
                .stream()
                .map(ProjectAssignment::getProject)
                .toList();
    }
}