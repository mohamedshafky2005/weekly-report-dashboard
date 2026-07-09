package com.shafky.weeklyreport.controller;

import com.shafky.weeklyreport.entity.WeeklyReport;
import com.shafky.weeklyreport.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/summary")
    public Map<String, Object> summary() {
        return dashboardService.summary();
    }

    @GetMapping("/submitted")
    public List<WeeklyReport> submittedReports() {
        return dashboardService.submittedReports();
    }

    @GetMapping("/draft")
    public List<WeeklyReport> draftReports() {
        return dashboardService.draftReports();
    }

    @GetMapping("/recent")
    public List<WeeklyReport> recentReports() {
        return dashboardService.recentReports();
    }

    @GetMapping("/member/{userId}")
    public List<WeeklyReport> reportsByMember(@PathVariable Long userId) {
        return dashboardService.reportsByMember(userId);
    }

    @GetMapping("/project/{projectId}")
    public List<WeeklyReport> reportsByProject(@PathVariable Long projectId) {
        return dashboardService.reportsByProject(projectId);
    }

    @GetMapping("/date-range")
    public List<WeeklyReport> reportsByDateRange(
            @RequestParam LocalDate start,
            @RequestParam LocalDate end
    ) {
        return dashboardService.reportsByDateRange(start, end);
    }

    @GetMapping("/member/{userId}/date-range")
    public List<WeeklyReport> reportsByMemberAndDateRange(
            @PathVariable Long userId,
            @RequestParam LocalDate start,
            @RequestParam LocalDate end
    ) {
        return dashboardService.reportsByMemberAndDateRange(userId, start, end);
    }

    @GetMapping("/project/{projectId}/date-range")
    public List<WeeklyReport> reportsByProjectAndDateRange(
            @PathVariable Long projectId,
            @RequestParam LocalDate start,
            @RequestParam LocalDate end
    ) {
        return dashboardService.reportsByProjectAndDateRange(projectId, start, end);
    }
}