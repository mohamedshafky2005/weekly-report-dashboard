package com.shafky.weeklyreport.service;

import com.shafky.weeklyreport.entity.WeeklyReport;
import com.shafky.weeklyreport.enums.ReportStatus;
import com.shafky.weeklyreport.repository.WeeklyReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AiAssistantService {

    private final WeeklyReportRepository reportRepository;

    public String answer(String question) {
        String q = question == null ? "" : question.toLowerCase();
        List<WeeklyReport> reports = reportRepository.findAll();

        if (reports.isEmpty()) {
            return "No weekly reports are available yet.";
        }

        if (q.contains("summary") || q.contains("summarize")) {
            return teamSummary(reports);
        }

        if (q.contains("blocker") || q.contains("challenge")) {
            return blockersSummary(reports);
        }

        if (q.contains("workload") || q.contains("hours")) {
            return workloadSummary(reports);
        }

        if (q.contains("submitted") || q.contains("status")) {
            return statusSummary(reports);
        }

        if (q.contains("recent")) {
            return recentSummary(reports);
        }

        return """
                I can help with:
                - Summarize team work
                - Show blockers
                - Show workload
                - Show submission status
                - Show recent reports
                """;
    }

    private String teamSummary(List<WeeklyReport> reports) {
        StringBuilder sb = new StringBuilder("Team Summary:\n\n");

        reports.stream()
                .limit(5)
                .forEach(r -> sb.append("- ")
                        .append(r.getUser() != null ? r.getUser().getName() : "Unknown User")
                        .append(" worked on ")
                        .append(r.getProject() != null ? r.getProject().getName() : "Unknown Project")
                        .append(". Completed: ")
                        .append(r.getTasksCompleted())
                        .append("\n"));

        return sb.toString();
    }

    private String blockersSummary(List<WeeklyReport> reports) {
        StringBuilder sb = new StringBuilder("Open Blockers / Challenges:\n\n");

        List<WeeklyReport> blockers = reports.stream()
                .filter(r -> r.getBlockers() != null && !r.getBlockers().isBlank())
                .toList();

        if (blockers.isEmpty()) {
            return "No blockers found across the team.";
        }

        blockers.forEach(r -> sb.append("- ")
                .append(r.getUser() != null ? r.getUser().getName() : "Unknown User")
                .append(" / ")
                .append(r.getProject() != null ? r.getProject().getName() : "Unknown Project")
                .append(": ")
                .append(r.getBlockers())
                .append("\n"));

        return sb.toString();
    }

    private String workloadSummary(List<WeeklyReport> reports) {
        int totalHours = reports.stream()
                .mapToInt(r -> r.getHoursWorked() == null ? 0 : r.getHoursWorked())
                .sum();

        return "Total reported workload is " + totalHours + " hours across "
                + reports.size() + " reports.";
    }

    private String statusSummary(List<WeeklyReport> reports) {
        long submitted = reports.stream()
                .filter(r -> r.getStatus() == ReportStatus.SUBMITTED)
                .count();

        long draft = reports.stream()
                .filter(r -> r.getStatus() == ReportStatus.DRAFT)
                .count();

        return "Submission Status:\n\nSubmitted: " + submitted + "\nDraft/Pending: " + draft;
    }

    private String recentSummary(List<WeeklyReport> reports) {
        StringBuilder sb = new StringBuilder("Recent Reports:\n\n");

        reports.stream()
                .sorted((a, b) -> b.getId().compareTo(a.getId()))
                .limit(5)
                .forEach(r -> sb.append("- ")
                        .append(r.getUser() != null ? r.getUser().getName() : "Unknown User")
                        .append(" | ")
                        .append(r.getProject() != null ? r.getProject().getName() : "Unknown Project")
                        .append(" | ")
                        .append(r.getStatus())
                        .append("\n"));

        return sb.toString();
    }
}