import { useEffect, useState } from "react";
import HeroHeader from "../components/HeroHeader";
import LoadingSpinner from "../components/LoadingSpinner";
import AiChatWidget from "../components/AiChatWidget";
import StatusBadge from "../components/StatusBadge";
import Layout from "../components/Layout";
import api from "../api/api";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FaFilePdf } from "react-icons/fa";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";

import {
    FaUsers,
    FaFolderOpen,
    FaClipboardList,
    FaCalendarWeek,
    FaChartLine,
    FaExclamationTriangle,
    FaTimesCircle,
    FaCheckCircle,
} from "react-icons/fa";

function ManagerDashboard() {
    const [summary, setSummary] = useState({});
    const [submitted, setSubmitted] = useState([]);
    const [filteredReports, setFilteredReports] = useState([]);
    const [recentReports, setRecentReports] = useState([]);
    const [users, setUsers] = useState([]);
    const [projects, setProjects] = useState([]);

    const [loading, setLoading] = useState(true);
    const [filtering, setFiltering] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [filter, setFilter] = useState({
        memberId: "",
        projectId: "",
        start: "",
        end: "",
    });

    const showMessage = (text) => {
        setMessage(text);
        setError("");
        setTimeout(() => setMessage(""), 3000);
    };

    const showError = (text) => {
        setError(text);
        setMessage("");
        setTimeout(() => setError(""), 3000);
    };

    const loadDashboard = async () => {
        try {
            setLoading(true);

            const summaryRes = await api.get("/dashboard/summary");
            const submittedRes = await api.get("/dashboard/submitted");
            const recentRes = await api.get("/dashboard/recent");
            const usersRes = await api.get("/users");
            const projectsRes = await api.get("/projects");

            setSummary(summaryRes.data);
            setSubmitted(submittedRes.data);
            setFilteredReports(submittedRes.data);
            setRecentReports(recentRes.data);
            setUsers(usersRes.data);
            setProjects(projectsRes.data);
        } catch {
            showError("Failed to load manager dashboard.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDashboard();
    }, []);

    const handleChange = (e) => {
        setFilter({ ...filter, [e.target.name]: e.target.value });
    };

    const applyFilter = async () => {
        try {
            setFiltering(true);

            let url = "/dashboard/submitted";

            if (filter.memberId) {
                url = `/dashboard/member/${filter.memberId}`;
            } else if (filter.projectId) {
                url = `/dashboard/project/${filter.projectId}`;
            } else if (filter.start && filter.end) {
                url = `/dashboard/date-range?start=${filter.start}&end=${filter.end}`;
            }

            const res = await api.get(url);
            setFilteredReports(res.data);
            showMessage("Filter applied successfully.");
        } catch {
            showError("Failed to apply filter.");
        } finally {
            setFiltering(false);
        }
    };

    const resetFilter = () => {
        setFilter({
            memberId: "",
            projectId: "",
            start: "",
            end: "",
        });

        setFilteredReports(submitted);
        showMessage("Filters reset.");
    };

    const statusData = [
        { name: "Submitted", value: summary.submittedReports || 0 },
        { name: "Pending", value: summary.pendingReports || 0 },
        { name: "Late", value: summary.lateReports || 0 },
    ].filter((item) => item.value > 0);

    const statusColors = ["#22c55e", "#facc15", "#ef4444"];

    const projectData = submitted.map((r) => ({
        project: r.project?.name || "Unknown",
        hours: r.hoursWorked || 0,
    }));

    if (loading) {
        return (
            <Layout>
                <LoadingSpinner text="Loading Manager Dashboard..." />
            </Layout>
        );
    }
    const exportPdf = () => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("Weekly Report Dashboard - Reports", 14, 20);

        doc.setFontSize(11);
        doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 28);

        const tableData = filteredReports.map((r) => [
            r.id,
            r.user?.name || r.user?.email || "N/A",
            r.project?.name || "N/A",
            `${r.weekStart} to ${r.weekEnd}`,
            r.status,
            r.hoursWorked || 0,
        ]);

        autoTable(doc, {
            startY: 36,
            head: [["ID", "Member", "Project", "Week", "Status", "Hours"]],
            body: tableData,
            theme: "grid",
            headStyles: {
                fillColor: [37, 99, 235],
                textColor: 255,
                fontStyle: "bold",
            },
            styles: {
                fontSize: 9,
                cellPadding: 3,
            },
        });

        doc.save("weekly-reports.pdf");
    };
    return (
        <Layout>
            <div className="container">
                <HeroHeader
                    title="Manager Dashboard"
                    subtitle="Monitor team progress, compliance, reports, blockers, and project workload."
                />

                {message && <div className="success-message">{message}</div>}
                {error && <div className="error-message">{error}</div>}

                <div className="stats">
                    <div className="dashboard-card blue">
                        <div>
                            <span>Total Users</span>
                            <h1>{summary.totalUsers || 0}</h1>
                        </div>
                        <FaUsers size={42} />
                    </div>

                    <div className="dashboard-card green">
                        <div>
                            <span>Total Projects</span>
                            <h1>{summary.totalProjects || 0}</h1>
                        </div>
                        <FaFolderOpen size={42} />
                    </div>

                    <div className="dashboard-card orange">
                        <div>
                            <span>Total Reports</span>
                            <h1>{summary.totalReports || 0}</h1>
                        </div>
                        <FaClipboardList size={42} />
                    </div>

                    <div className="dashboard-card purple">
                        <div>
                            <span>Reports This Week</span>
                            <h1>{summary.reportsThisWeek || 0}</h1>
                        </div>
                        <FaCalendarWeek size={42} />
                    </div>

                    <div className="dashboard-card blue compliance-card">
                        <div className="progress-card-content">
                            <span>Compliance</span>

                            <h1>{Number(summary.compliancePercentage || 0).toFixed(1)}%</h1>

                            <div className="progress-bar">
                                <div
                                    className="progress-fill"
                                    style={{
                                        width: `${Math.max(
                                            3,
                                            Math.min(Number(summary.compliancePercentage || 0), 100)
                                        )}%`,
                                    }}
                                ></div>
                            </div>
                        </div>

                        <FaChartLine size={42} />
                    </div>

                    <div className="dashboard-card green">
                        <div>
                            <span>Submitted</span>
                            <h1>{summary.submittedReports || 0}</h1>
                        </div>
                        <FaCheckCircle size={42} />
                    </div>

                    <div className="dashboard-card orange">
                        <div>
                            <span>Open Blockers</span>
                            <h1>{summary.openBlockers || 0}</h1>
                        </div>
                        <FaExclamationTriangle size={42} />
                    </div>

                    <div className="dashboard-card purple">
                        <div>
                            <span>Late Reports</span>
                            <h1>{summary.lateReports || 0}</h1>
                        </div>
                        <FaTimesCircle size={42} />
                    </div>
                </div>

                <div className="dashboard-grid">
                    <div className="card chart-card">
                        <h3>Submission Status</h3>

                        <ResponsiveContainer width="100%" height={280}>
                            <PieChart>
                                <Pie
                                    data={statusData}
                                    dataKey="value"
                                    nameKey="name"
                                    outerRadius={90}
                                    label
                                >
                                    {statusData.map((_, index) => (
                                        <Cell
                                            key={index}
                                            fill={statusColors[index % statusColors.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="card chart-card">
                        <h3>Workload by Project</h3>

                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                                data={projectData}
                                margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
                            >
                                <XAxis dataKey="project" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="hours" fill="#2563eb" radius={[10, 10, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="card">
                    <h3>Manager Filters</h3>

                    <div className="filter-grid">
                        <select name="memberId" value={filter.memberId} onChange={handleChange}>
                            <option value="">All Members</option>

                            {users
                                .filter((u) => u.role === "TEAM_MEMBER")
                                .map((u) => (
                                    <option key={u.id} value={u.id}>
                                        {u.name} - {u.email}
                                    </option>
                                ))}
                        </select>

                        <select name="projectId" value={filter.projectId} onChange={handleChange}>
                            <option value="">All Projects</option>

                            {projects.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.name}
                                </option>
                            ))}
                        </select>

                        <input
                            name="start"
                            type="date"
                            value={filter.start}
                            onChange={handleChange}
                        />

                        <input
                            name="end"
                            type="date"
                            value={filter.end}
                            onChange={handleChange}
                        />

                        <button onClick={applyFilter} disabled={filtering}>
                            {filtering ? "Filtering..." : "Apply Filter"}
                        </button>

                        <button onClick={resetFilter} disabled={filtering}>
                            Reset
                        </button>
                    </div>
                </div>

                <div className="card">
                    <h3>Recent Activity</h3>

                    {recentReports.map((r) => (
                        <div className="activity-item" key={r.id}>
                            <p>
                                <b>{r.user?.name || r.user?.email}</b> submitted/updated report
                                for <b> {r.project?.name}</b>
                            </p>

                            <small>
                                {r.weekStart} to {r.weekEnd} —{" "}
                                <StatusBadge status={r.status} />
                            </small>
                        </div>
                    ))}

                    {recentReports.length === 0 && (
                        <div className="empty-state">
                            <p>No recent activity yet.</p>
                        </div>
                    )}
                </div>

                <div className="card">
                    <div className="section-header">
                        <h3>Filtered / Submitted Reports</h3>

                        <button onClick={exportPdf} disabled={filteredReports.length === 0}>
                            <FaFilePdf />
                            Export PDF
                        </button>
                    </div>

                    <div className="table-wrapper">

                        <table className="report-table">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Member</th>
                                <th>Project</th>
                                <th>Week</th>
                                <th>Status</th>
                                <th>Hours</th>
                            </tr>
                            </thead>

                            <tbody>
                            {filteredReports.map((r) => (
                                <tr key={r.id}>
                                    <td>{r.id}</td>
                                    <td>{r.user?.name || r.user?.email}</td>
                                    <td>{r.project?.name}</td>
                                    <td>
                                        {r.weekStart} to {r.weekEnd}
                                    </td>
                                    <td>
                                        <StatusBadge status={r.status} />
                                    </td>
                                    <td>{r.hoursWorked}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                    </div>

                    {filteredReports.length === 0 && (
                        <div className="empty-state">
                            <p>No reports found.</p>
                        </div>
                    )}
                </div>
            </div>
            <AiChatWidget />
        </Layout>
    );
}

export default ManagerDashboard;