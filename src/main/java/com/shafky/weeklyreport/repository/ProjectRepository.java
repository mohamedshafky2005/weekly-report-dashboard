package com.shafky.weeklyreport.repository;

import com.shafky.weeklyreport.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}