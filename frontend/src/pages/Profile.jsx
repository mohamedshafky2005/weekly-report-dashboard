import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import HeroHeader from "../components/HeroHeader";
import LoadingSpinner from "../components/LoadingSpinner";
import api from "../api/api";
import { toast } from "react-toastify";

function Profile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const loadProfile = async () => {
        try {
            setLoading(true);
            const res = await api.get("/profile/me");
            setProfile(res.data);
        } catch {
            toast.error("Failed to load profile.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProfile();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const changePassword = async (e) => {
        e.preventDefault();

        if (form.newPassword !== form.confirmPassword) {
            toast.error("New password and confirm password do not match.");
            return;
        }

        if (form.newPassword.length < 6) {
            toast.error("New password must be at least 6 characters.");
            return;
        }

        try {
            setSaving(true);

            await api.put("/profile/change-password", {
                currentPassword: form.currentPassword,
                newPassword: form.newPassword,
            });

            toast.success("Password changed successfully.");

            setForm({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
        } catch {
            toast.error("Current password is incorrect.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <Layout>
                <LoadingSpinner text="Loading Profile..." />
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="container">
                <HeroHeader
                    title="My Profile"
                    subtitle="View your account details and update your password securely."
                />

                <div className="dashboard-grid">
                    <div className="card">
                        <h3>Account Information</h3>

                        <p>
                            <b>Name:</b> {profile?.name}
                        </p>

                        <p>
                            <b>Email:</b> {profile?.email}
                        </p>

                        <p>
                            <b>Role:</b>{" "}
                            <span className="status-badge status-submitted">
                {profile?.role}
              </span>
                        </p>
                    </div>

                    <form className="card form-grid" onSubmit={changePassword}>
                        <h3>Change Password</h3>

                        <input
                            type="password"
                            name="currentPassword"
                            placeholder="Current Password"
                            value={form.currentPassword}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="password"
                            name="newPassword"
                            placeholder="New Password"
                            value={form.newPassword}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm New Password"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            required
                        />

                        <div className="button-group">
                            <button type="submit" disabled={saving}>
                                {saving ? "Updating..." : "Change Password"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default Profile;