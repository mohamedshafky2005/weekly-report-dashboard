import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import HeroHeader from "../components/HeroHeader";
import LoadingSpinner from "../components/LoadingSpinner";
import ConfirmModal from "../components/ConfirmModal";
import api from "../api/api";
import { toast } from "react-toastify";

function Assignments() {
    const [users, setUsers] = useState([]);
    const [projects, setProjects] = useState([]);
    const [assignments, setAssignments] = useState([]);

    const [form, setForm] = useState({
        userId: "",
        projectId: "",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [deleteId, setDeleteId] = useState(null);

    const loadData = async () => {
        try {
            setLoading(true);

            const usersRes = await api.get("/users");
            const projectsRes = await api.get("/projects");
            const assignmentsRes = await api.get("/assignments");

            setUsers(usersRes.data.filter((u) => u.role === "TEAM_MEMBER"));
            setProjects(projectsRes.data);
            setAssignments(assignmentsRes.data);
        } catch {
            toast.error("Failed to load assignments data.");
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

    const assignProject = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);

            await api.post("/assignments", {
                userId: Number(form.userId),
                projectId: Number(form.projectId),
            });

            toast.success("Project assigned successfully.");

            setForm({
                userId: "",
                projectId: "",
            });

            loadData();
        } catch {
            toast.error("This member may already be assigned to this project.");
        } finally {
            setSaving(false);
        }
    };

    const confirmDelete = async () => {
        try {
            await api.delete(`/assignments/${deleteId}`);
            toast.success("Assignment removed successfully.");
            setDeleteId(null);
            loadData();
        } catch {
            toast.error("Failed to remove assignment.");
        }
    };

    if (loading) {
        return (
            <Layout>
                <LoadingSpinner text="Loading Assignments..." />
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="container">
                <HeroHeader
                    title="Project Assignments"
                    subtitle="Assign team members to relevant projects and manage project access."
                />

                <form className="card form-grid" onSubmit={assignProject}>
                    <h3>Assign Team Member to Project</h3>

                    <select
                        name="userId"
                        value={form.userId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Team Member</option>

                        {users.map((u) => (
                            <option key={u.id} value={u.id}>
                                {u.name} - {u.email}
                            </option>
                        ))}
                    </select>

                    <select
                        name="projectId"
                        value={form.projectId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Project</option>

                        {projects.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.name}
                            </option>
                        ))}
                    </select>

                    <div className="button-group">
                        <button type="submit" disabled={saving}>
                            {saving ? "Assigning..." : "Assign Project"}
                        </button>
                    </div>
                </form>

                <div className="card">
                    <h3>Current Assignments</h3>

                    <div className="table-wrapper">
                        <table className="report-table">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Team Member</th>
                                <th>Email</th>
                                <th>Project</th>
                                <th>Assigned Date</th>
                                <th>Action</th>
                            </tr>
                            </thead>

                            <tbody>
                            {assignments.map((a) => (
                                <tr key={a.id}>
                                    <td>{a.id}</td>
                                    <td>{a.user?.name}</td>
                                    <td>{a.user?.email}</td>
                                    <td>{a.project?.name}</td>
                                    <td>{a.assignedDate}</td>
                                    <td>
                                        <button
                                            className="danger"
                                            onClick={() => setDeleteId(a.id)}
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {assignments.length === 0 && (
                        <div className="empty-state">
                            <p>No project assignments found.</p>
                        </div>
                    )}
                </div>

                <ConfirmModal
                    open={deleteId !== null}
                    title="Remove Assignment?"
                    message="This team member will no longer be assigned to this project."
                    onConfirm={confirmDelete}
                    onCancel={() => setDeleteId(null)}
                />
            </div>
        </Layout>
    );
}

export default Assignments;