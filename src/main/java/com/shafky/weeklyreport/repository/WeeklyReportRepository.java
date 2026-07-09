package com.shafky.weeklyreport.repository;

import com.shafky.weeklyreport.entity.WeeklyReport;
import com.shafky.weeklyreport.enums.ReportStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface WeeklyReportRepository extends JpaRepository<WeeklyReport, Long> {

    List<WeeklyReport> findByUserId(Long userId);

    List<WeeklyReport> findByProjectId(Long projectId);

    List<WeeklyReport> findByStatus(ReportStatus status);

    List<WeeklyReport> findByWeekStartGreaterThanEqualAndWeekEndLessThanEqual(LocalDate start, LocalDate end);

    List<WeeklyReport> findByUserIdAndWeekStartGreaterThanEqualAndWeekEndLessThanEqual(Long userId, LocalDate start, LocalDate end);

    List<WeeklyReport> findByProjectIdAndWeekStartGreaterThanEqualAndWeekEndLessThanEqual(Long projectId, LocalDate start, LocalDate end);

    long countByStatus(ReportStatus status);

    long countByBlockersIsNotNullAndBlockersNot(String blockers);

    long countByWeekStartGreaterThanEqualAndWeekEndLessThanEqual(LocalDate start, LocalDate end);

    long countByStatusAndWeekEndBefore(ReportStatus status, LocalDate today);
}