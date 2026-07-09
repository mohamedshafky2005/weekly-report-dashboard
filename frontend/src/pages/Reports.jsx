import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import LoadingSpinner from "../components/LoadingSpinner";
import StatusBadge from "../components/StatusBadge";
import HeroHeader from "../components/HeroHeader";
import api from "../api/api";

function Reports() {
    const [projects, setProjects] = useState([]);
    const [reports, setReports] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [submittingId, setSubmittingId] = useState(null);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const emptyForm = {
        weekStart: "",
        weekEnd: "",
        projectId: "",
        tasksCompleted: "",
        tasksPlanned: "",
        blockers: "",
        hoursWorked: "",
        notes: "",
    };

    const [form, setForm] = useState(emptyForm);

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

    const loadData = async () => {
        try {
            setLoading(true);

            const role = localStorage.getItem("role");

            const projectsRes =
                role === "MANAGER"
                    ? await api.get("/projects")
                    : await api.get("/projects/my");

            const reportsRes = await api.get("/reports/my");

            setProjects(projectsRes.data);
            setReports(reportsRes.data);
        } catch {
            showError("Failed to load reports.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const resetForm = () => {
        setForm(emptyForm);
        setEditingId(null);
    };

    const saveReport = async (e) => {
        e.preventDefault();

        if (projects.length === 0) {
            showError("No projects assigned. Please contact your manager.");
            return;
        }

        const payload = {
            ...form,
            projectId: Number(form.projectId),
            hoursWorked: Number(form.hoursWorked),
        };

        try {
            setSaving(true);

            if (editingId) {
                await api.put(`/reports/${editingId}`, payload);
                showMessage("Report updated successfully.");
            } else {
                await api.post("/reports", payload);
                showMessage("Report created successfully.");
            }

            resetForm();
            loadData();
        } catch {
            showError("Failed to save report.");
        } finally {
            setSaving(false);
        }
    };

    const editReport = (report) => {
        setEditingId(report.id);

        setForm({
            weekStart: report.weekStart,
            weekEnd: report.weekEnd,
            projectId: report.project?.id || "",
            tasksCompleted: report.tasksCompleted || "",
            tasksPlanned: report.tasksPlanned || "",
            blockers: report.blockers || "",
            hoursWorked: report.hoursWorked || "",
            notes: report.notes || "",
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const submitReport = async (id) => {
        try {
            setSubmittingId(id);

            await api.put(`/reports/${id}/submit`);

            showMessage("Report submitted successfully.");

            loadData();
        } catch {
            showError("Failed to submit report.");
        } finally {
            setSubmittingId(null);
        }
    };

    if (loading) {
        return (
            <Layout>
                <LoadingSpinner text="Loading Reports..." />
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="container">
                <HeroHeader
                    title="Weekly Reports"
                    subtitle="Create, edit, submit, and review your weekly report history."
                />

                {message && <div className="success-message">{message}</div>}
                {error && <div className="error-message">{error}</div>}

                {projects.length === 0 && (
                    <div className="empty-state">
                        <p>
                            No projects have been assigned to you yet. Please contact your
                            manager.
                        </p>
                    </div>
                )}

                <form className="card form-grid" onSubmit={saveReport}>
                    <h3>{editingId ? "Edit Weekly Report" : "Create Weekly Report"}</h3>

                    <input
                        name="weekStart"
                        type="date"
                        value={form.weekStart}
                        onChange={handleChange}
                        required
                        disabled={projects.length === 0}
                    />

                    <input
                        name="weekEnd"
                        type="date"
                        value={form.weekEnd}
                        onChange={handleChange}
                        required
                        disabled={projects.length === 0}
                    />

                    <select
                        name="projectId"
                        value={form.projectId}
                        onChange={handleChange}
                        required
                        disabled={projects.length === 0}
                    >
                        <option value="">Select Project</option>

                        {projects.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.name}
                            </option>
                        ))}
                    </select>

                    <input
                        name="hoursWorked"
                        type="number"
                        placeholder="Hours Worked"
                        value={form.hoursWorked}
                        onChange={handleChange}
                        disabled={projects.length === 0}
                    />

                    <textarea
                        name="tasksCompleted"
                        placeholder="Tasks Completed"
                        value={form.tasksCompleted}
                        onChange={handleChange}
                        required
                        disabled={projects.length === 0}
                    />

                    <textarea
                        name="tasksPlanned"
                        placeholder="Tasks Planned Next Week"
                        value={form.tasksPlanned}
                        onChange={handleChange}
                        required
                        disabled={projects.length === 0}
                    />

                    <textarea
                        name="blockers"
                        placeholder="Blockers / Challenges"
                        value={form.blockers}
                        onChange={handleChange}
                        disabled={projects.length === 0}
                    />

                    <textarea
                        name="notes"
                        placeholder="Notes / Links"
                        value={form.notes}
                        onChange={handleChange}
                        disabled={projects.length === 0}
                    />

                    <div className="button-group">
                        <button type="submit" disabled={saving || projects.length === 0}>
                            {saving
                                ? "Saving..."
                                : editingId
                                    ? "Update Report"
                                    : "Create Report"}
                        </button>

                        {editingId && (
                            <button type="button" onClick={resetForm} disabled={saving}>
                                Cancel Edit
                            </button>
                        )}
                    </div>
                </form>

                <h3>My Report History</h3>

                <div className="grid">
                    {reports.map((r) => (
                        <div className="card" key={r.id}>
                            <h4>
                                {r.weekStart} to {r.weekEnd}
                            </h4>

                            <p>
                                <b>Project:</b> {r.project?.name}
                            </p>

                            <p>
                                <b>Status:</b> <StatusBadge status={r.status} />
                            </p>

                            <p>
                                <b>Completed:</b> {r.tasksCompleted}
                            </p>

                            <p>
                                <b>Planned:</b> {r.tasksPlanned}
                            </p>

                            <p>
                                <b>Blockers:</b> {r.blockers || "None"}
                            </p>

                            <p>
                                <b>Hours:</b> {r.hoursWorked}
                            </p>

                            <div className="button-group">
                                <button onClick={() => editReport(r)}>Edit</button>

                                {r.status === "DRAFT" && (
                                    <button
                                        onClick={() => submitReport(r.id)}
                                        disabled={submittingId === r.id}
                                    >
                                        {submittingId === r.id ? "Submitting..." : "Submit"}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {reports.length === 0 && (
                    <div className="empty-state">
                        <p>No reports found. Create your first weekly report.</p>
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default Reports;