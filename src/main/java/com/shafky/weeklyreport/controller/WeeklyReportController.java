package com.shafky.weeklyreport.controller;

import com.shafky.weeklyreport.dto.WeeklyReportRequest;
import com.shafky.weeklyreport.entity.WeeklyReport;
import com.shafky.weeklyreport.service.WeeklyReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class WeeklyReportController {

    private final WeeklyReportService weeklyReportService;

    @PostMapping
    public WeeklyReport create(@RequestBody WeeklyReportRequest request) {
        return weeklyReportService.create(request);
    }

    @GetMapping("/my")
    public List<WeeklyReport> myReports() {
        return weeklyReportService.myReports();
    }

    @GetMapping("/all")
    public List<WeeklyReport> allReports() {
        return weeklyReportService.allReports();
    }

    @GetMapping("/project/{projectId}")
    public List<WeeklyReport> reportsByProject(@PathVariable Long projectId) {
        return weeklyReportService.reportsByProject(projectId);
    }

    @PutMapping("/{id}")
    public WeeklyReport update(
            @PathVariable Long id,
            @RequestBody WeeklyReportRequest request
    ) {
        return weeklyReportService.update(id, request);
    }

    @PutMapping("/{id}/submit")
    public WeeklyReport submit(@PathVariable Long id) {
        return weeklyReportService.submit(id);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        weeklyReportService.delete(id);
        return "Weekly Report Deleted Successfully";
    }
}