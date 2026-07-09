package com.shafky.weeklyreport.service;

import com.shafky.weeklyreport.dto.WeeklyReportRequest;
import com.shafky.weeklyreport.entity.WeeklyReport;

import java.util.List;

public interface WeeklyReportService {

    WeeklyReport create(WeeklyReportRequest request);

    List<WeeklyReport> myReports();

    List<WeeklyReport> allReports();

    WeeklyReport update(Long id, WeeklyReportRequest request);

    WeeklyReport submit(Long id);

    void delete(Long id);

    List<WeeklyReport> reportsByProject(Long projectId);
}