import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";
import ConfirmModal from "../components/ConfirmModal";
import Layout from "../components/Layout";
import api from "../api/api";

function Projects() {
    const [projects, setProjects] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const emptyForm = { name: "", description: "" };
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

    const loadProjects = async () => {
        try {
            setLoading(true);
            const res = await api.get("/projects");
            setProjects(res.data);
        } catch {
            showError("Failed to load projects.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProjects();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setForm(emptyForm);
        setEditingId(null);
    };

    const saveProject = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);

            if (editingId) {
                await api.put(`/projects/${editingId}`, form);
                toast.success("Project updated successfully.");
            } else {
                await api.post("/projects", form);
                toast.success("Project created successfully");
            }

            resetForm();
            loadProjects();
        } catch {
            toast.error("Cannot delete this project because reports are already linked to it.")
        } finally {
            setSaving(false);
        }
    };

    const editProject = (project) => {
        setEditingId(project.id);
        setForm({
            name: project.name || "",
            description: project.description || "",
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const deleteProject = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this project?");
        if (!confirmDelete) return;

        try {
            await api.delete(`/projects/${id}`);
            toast.success("Project deleted successfully.");
            loadProjects();
        } catch {
            toast.error("Cannot delete this project because reports are already linked to it.")
        }
    };

    if (loading) {
        return (
            <Layout>
                <LoadingSpinner text="Loading Projects..." />
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="container">
                <h2>Projects / Categories</h2>

                {message && <div className="success-message">{message}</div>}
                {error && <div className="error-message">{error}</div>}

                <form className="card form-grid" onSubmit={saveProject}>
                    <h3>{editingId ? "Edit Project" : "Add Project"}</h3>

                    <input
                        name="name"
                        placeholder="Project Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="description"
                        placeholder="Description"
                        value={form.description}
                        onChange={handleChange}
                    />

                    <div className="button-group">
                        <button type="submit" disabled={saving}>
                            {saving ? "Saving..." : editingId ? "Update Project" : "Add Project"}
                        </button>

                        {editingId && (
                            <button type="button" onClick={resetForm} disabled={saving}>
                                Cancel Edit
                            </button>
                        )}
                    </div>
                </form>

                <div className="grid">
                    {projects.map((p) => (
                        <div className="card" key={p.id}>
                            <h3>{p.name}</h3>
                            <p>{p.description}</p>

                            <div className="button-group">
                                <button onClick={() => editProject(p)}>Edit</button>
                                <button className="danger" onClick={() => deleteProject(p.id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export default Projects;