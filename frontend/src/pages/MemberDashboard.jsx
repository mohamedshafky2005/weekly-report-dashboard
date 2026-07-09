import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import LoadingSpinner from "../components/LoadingSpinner";
import HeroHeader from "../components/HeroHeader";
import StatusBadge from "../components/StatusBadge";
import api from "../api/api";

import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from "recharts";

import {
    FaClipboardList,
    FaCheckCircle,
    FaClock,
    FaHourglassHalf,
} from "react-icons/fa";

function MemberDashboard() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadDashboard = async () => {
        try {
            setLoading(true);
            const res = await api.get("/reports/my");
            setReports(res.data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDashboard();
    }, []);

    if (loading) {
        return (
            <Layout>
                <LoadingSpinner text="Loading My Dashboard..." />
            </Layout>
        );
    }

    const submitted = reports.filter((r) => r.status === "SUBMITTED").length;
    const draft = reports.filter((r) => r.status === "DRAFT").length;

    const totalHours = reports.reduce(
        (sum, r) => sum + (Number(r.hoursWorked) || 0),
        0
    );

    const chartData = [
        { name: "Submitted", value: submitted },
        { name: "Draft", value: draft },
    ];

    const colors = ["#22c55e", "#f59e0b"];

    return (
        <Layout>
            <div className="container">
                <HeroHeader
                    title="My Dashboard"
                    subtitle="Track your weekly reports, submissions, drafts and working hours."
                />

                <div className="stats">
                    <div className="dashboard-card blue">
                        <div>
                            <span>Total Reports</span>
                            <h1>{reports.length}</h1>
                        </div>
                        <FaClipboardList size={42} />
                    </div>

                    <div className="dashboard-card green">
                        <div>
                            <span>Submitted</span>
                            <h1>{submitted}</h1>
                        </div>
                        <FaCheckCircle size={42} />
                    </div>

                    <div className="dashboard-card orange">
                        <div>
                            <span>Draft</span>
                            <h1>{draft}</h1>
                        </div>
                        <FaClock size={42} />
                    </div>

                    <div className="dashboard-card purple">
                        <div>
                            <span>Total Hours</span>
                            <h1>{totalHours}</h1>
                        </div>
                        <FaHourglassHalf size={42} />
                    </div>
                </div>

                <div className="dashboard-grid">
                    <div className="card chart-card">
                        <h3>Submission Status</h3>

                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    dataKey="value"
                                    nameKey="name"
                                    outerRadius={110}
                                    label
                                >
                                    {chartData.map((_, index) => (
                                        <Cell key={index} fill={colors[index]} />
                                    ))}
                                </Pie>

                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="card">
                        <h3>Latest Reports</h3>

                        {reports.length === 0 && (
                            <div className="empty-state">
                                <p>No reports created yet.</p>
                            </div>
                        )}

                        {reports.slice(0, 5).map((report) => (
                            <div className="activity-item" key={report.id}>
                                <p>
                                    <b>{report.project?.name}</b>
                                </p>

                                <small>
                                    {report.weekStart} → {report.weekEnd}
                                </small>

                                <p>
                                    <b>Status:</b> <StatusBadge status={report.status} />
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default MemberDashboard;