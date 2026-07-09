import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "TEAM_MEMBER",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const register = async (e) => {
        e.preventDefault();

        try {
            await api.post("/auth/register", form);

            localStorage.clear();

            alert("Registration successful. Please login.");

            window.location.href = "/login";
        } catch (err) {
            alert("Registration failed");
        }
    };

    return (
        <div className="auth-page">
            <form className="card auth-card" onSubmit={register}>
                <h2>Create Account</h2>

                <input
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />

                <select name="role" value={form.role} onChange={handleChange}>
                    <option value="TEAM_MEMBER">Team Member</option>
                    <option value="MANAGER">Manager</option>
                </select>

                <button type="submit">Register</button>

                <p>
                    Already have account? <Link to="/login">Login</Link>
                </p>
            </form>
        </div>
    );
}

export default Register;