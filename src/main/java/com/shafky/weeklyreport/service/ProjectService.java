package com.shafky.weeklyreport.service;

import com.shafky.weeklyreport.dto.ProjectRequest;
import com.shafky.weeklyreport.entity.Project;

import java.util.List;

public interface ProjectService {

    Project create(ProjectRequest request);

    List<Project> getAll();

    Project update(Long id, ProjectRequest request);

    void delete(Long id);
}