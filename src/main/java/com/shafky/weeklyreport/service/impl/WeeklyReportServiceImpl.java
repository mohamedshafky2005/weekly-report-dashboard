package com.shafky.weeklyreport.service.impl;

import com.shafky.weeklyreport.dto.WeeklyReportRequest;
import com.shafky.weeklyreport.entity.Project;
import com.shafky.weeklyreport.entity.User;
import com.shafky.weeklyreport.entity.WeeklyReport;
import com.shafky.weeklyreport.enums.ReportStatus;
import com.shafky.weeklyreport.repository.ProjectRepository;
import com.shafky.weeklyreport.repository.UserRepository;
import com.shafky.weeklyreport.repository.WeeklyReportRepository;
import com.shafky.weeklyreport.service.WeeklyReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WeeklyReportServiceImpl implements WeeklyReportService {

    private final WeeklyReportRepository weeklyReportRepository;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Current user not found"));
    }

    @Override
    public WeeklyReport create(WeeklyReportRequest request) {

        User user = getCurrentUser();

        Project project = projectRepository.findById(request.getProjectId())
                .orElseThrow(() -> new RuntimeException("Project not found"));

        WeeklyReport report = WeeklyReport.builder()
                .weekStart(request.getWeekStart())
                .weekEnd(request.getWeekEnd())
                .project(project)
                .tasksCompleted(request.getTasksCompleted())
                .tasksPlanned(request.getTasksPlanned())
                .blockers(request.getBlockers())
                .hoursWorked(request.getHoursWorked())
                .notes(request.getNotes())
                .status(ReportStatus.DRAFT)
                .user(user)
                .build();

        return weeklyReportRepository.save(report);
    }

    @Override
    public List<WeeklyReport> myReports() {
        User user = getCurrentUser();
        return weeklyReportRepository.findByUserId(user.getId());
    }

    @Override
    public List<WeeklyReport> allReports() {
        return weeklyReportRepository.findAll();
    }

    @Override
    public WeeklyReport update(Long id, WeeklyReportRequest request) {

        WeeklyReport report = weeklyReportRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Weekly report not found"));

        Project project = projectRepository.findById(request.getProjectId())
                .orElseThrow(() -> new RuntimeException("Project not found"));

        report.setWeekStart(request.getWeekStart());
        report.setWeekEnd(request.getWeekEnd());
        report.setProject(project);
        report.setTasksCompleted(request.getTasksCompleted());
        report.setTasksPlanned(request.getTasksPlanned());
        report.setBlockers(request.getBlockers());
        report.setHoursWorked(request.getHoursWorked());
        report.setNotes(request.getNotes());

        return weeklyReportRepository.save(report);
    }

    @Override
    public WeeklyReport submit(Long id) {

        WeeklyReport report = weeklyReportRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Weekly report not found"));

        report.setStatus(ReportStatus.SUBMITTED);

        return weeklyReportRepository.save(report);
    }

    @Override
    public void delete(Long id) {
        weeklyReportRepository.deleteById(id);
    }

    @Override
    public List<WeeklyReport> reportsByProject(Long projectId) {
        return weeklyReportRepository.findByProjectId(projectId);
    }
}