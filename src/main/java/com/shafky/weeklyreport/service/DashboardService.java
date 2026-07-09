package com.shafky.weeklyreport.service;

import com.shafky.weeklyreport.entity.WeeklyReport;
import com.shafky.weeklyreport.enums.ReportStatus;
import com.shafky.weeklyreport.repository.ProjectRepository;
import com.shafky.weeklyreport.repository.UserRepository;
import com.shafky.weeklyreport.repository.WeeklyReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final WeeklyReportRepository reportRepository;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;

    public Map<String, Object> summary() {
        LocalDate today = LocalDate.now();
        LocalDate weekStart = today.with(DayOfWeek.MONDAY);
        LocalDate weekEnd = today.with(DayOfWeek.SUNDAY);

        long totalUsers = userRepository.count();
        long totalProjects = projectRepository.count();
        long totalReports = reportRepository.count();

        long submittedReports = reportRepository.countByStatus(ReportStatus.SUBMITTED);
        long draftReports = reportRepository.countByStatus(ReportStatus.DRAFT);
        long pendingReports = draftReports;
        long lateReports = reportRepository.countByStatusAndWeekEndBefore(ReportStatus.DRAFT, today);
        long openBlockers = reportRepository.countByBlockersIsNotNullAndBlockersNot("");
        long reportsThisWeek = reportRepository.countByWeekStartGreaterThanEqualAndWeekEndLessThanEqual(weekStart, weekEnd);

        double compliance = totalUsers == 0 ? 0 : ((double) submittedReports / totalUsers) * 100;

        Map<String, Object> map = new HashMap<>();
        map.put("totalUsers", totalUsers);
        map.put("totalProjects", totalProjects);
        map.put("totalReports", totalReports);
        map.put("reportsThisWeek", reportsThisWeek);
        map.put("submittedReports", submittedReports);
        map.put("draftReports", draftReports);
        map.put("pendingReports", pendingReports);
        map.put("lateReports", lateReports);
        map.put("openBlockers", openBlockers);
        map.put("compliancePercentage", compliance);

        return map;
    }

    public List<WeeklyReport> submittedReports() {
        return reportRepository.findByStatus(ReportStatus.SUBMITTED);
    }

    public List<WeeklyReport> draftReports() {
        return reportRepository.findByStatus(ReportStatus.DRAFT);
    }

    public List<WeeklyReport> recentReports() {
        return reportRepository.findAll()
                .stream()
                .sorted((a, b) -> b.getId().compareTo(a.getId()))
                .limit(5)
                .toList();
    }

    public List<WeeklyReport> reportsByMember(Long userId) {
        return reportRepository.findByUserId(userId);
    }

    public List<WeeklyReport> reportsByProject(Long projectId) {
        return reportRepository.findByProjectId(projectId);
    }

    public List<WeeklyReport> reportsByDateRange(LocalDate start, LocalDate end) {
        return reportRepository.findByWeekStartGreaterThanEqualAndWeekEndLessThanEqual(start, end);
    }

    public List<WeeklyReport> reportsByMemberAndDateRange(Long userId, LocalDate start, LocalDate end) {
        return reportRepository.findByUserIdAndWeekStartGreaterThanEqualAndWeekEndLessThanEqual(userId, start, end);
    }

    public List<WeeklyReport> reportsByProjectAndDateRange(Long projectId, LocalDate start, LocalDate end) {
        return reportRepository.findByProjectIdAndWeekStartGreaterThanEqualAndWeekEndLessThanEqual(projectId, start, end);
    }
}