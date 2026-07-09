package com.shafky.weeklyreport.service.impl;

import com.shafky.weeklyreport.dto.ProjectRequest;
import com.shafky.weeklyreport.entity.Project;
import com.shafky.weeklyreport.repository.ProjectRepository;
import com.shafky.weeklyreport.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;

    @Override
    public Project create(ProjectRequest request) {

        Project project = Project.builder()
                .name(request.getName())
                .description(request.getDescription())
                .build();

        return projectRepository.save(project);
    }

    @Override
    public List<Project> getAll() {
        return projectRepository.findAll();
    }

    @Override
    public Project update(Long id, ProjectRequest request) {

        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project Not Found"));

        project.setName(request.getName());
        project.setDescription(request.getDescription());

        return projectRepository.save(project);
    }

    @Override
    public void delete(Long id) {
        projectRepository.deleteById(id);
    }
}