package com.shafky.weeklyreport.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ReportRequest {
    private LocalDate weekStart;
    private LocalDate weekEnd;
    private Long projectId;
    private String tasksCompleted;
    private String tasksPlanned;
    private String blockers;
    private Integer hoursWorked;
    private String notes;
}