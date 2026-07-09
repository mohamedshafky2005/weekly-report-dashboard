import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

function Login() {
    const [form, setForm] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const login = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/auth/login", form);

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.role);
            localStorage.setItem("name", res.data.name);
            localStorage.setItem("email", res.data.email);

            if (res.data.role === "MANAGER") {
                window.location.href = "/manager";
            } else {
                window.location.href = "/member";
            }
        } catch {
            alert("Login failed");
        }
    };

    return (
        <div className="auth-page">
            <form className="card auth-card" onSubmit={login}>
                <h2>Weekly Report Dashboard</h2>
                <p>Login to continue</p>

                <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} required />

                <button type="submit">Login</button>

                <p>
                    No account? <Link to="/register">Register</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;