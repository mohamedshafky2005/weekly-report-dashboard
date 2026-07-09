import { NavLink } from "react-router-dom";

import {
    FaChartPie,
    FaFolderOpen,
    FaClipboardList,
    FaUserCircle,
    FaSignOutAlt,
    FaUserCheck,
} from "react-icons/fa";

function Navbar() {
    const role = localStorage.getItem("role");
    const name = localStorage.getItem("name") || "User";

    const logout = () => {
        localStorage.clear();
        window.location.href = "/login";
    };

    return (
        <aside className="sidebar">
            <div className="logo-section">
                <div className="logo-circle">WR</div>

                <div>
                    <h2>Weekly Report</h2>
                    <small>Management System</small>
                </div>
            </div>

            <div className="profile-card">
                <FaUserCircle size={60} />
                <h3>{name}</h3>
                <span>{role}</span>
            </div>

            <nav className="menu">
                <NavLink
                    to={role === "MANAGER" ? "/manager" : "/member"}
                    className={({ isActive }) => (isActive ? "active" : "")}
                >
                    <FaChartPie />
                    Dashboard
                </NavLink>

                <NavLink
                    to="/reports"
                    className={({ isActive }) => (isActive ? "active" : "")}
                >
                    <FaClipboardList />
                    Reports
                </NavLink>

                <NavLink
                    to="/projects"
                    className={({ isActive }) => (isActive ? "active" : "")}
                >
                    <FaFolderOpen />
                    Projects
                </NavLink>

                {role === "MANAGER" && (
                    <NavLink
                        to="/assignments"
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        <FaUserCheck />
                        Assignments
                    </NavLink>
                )}

                <NavLink
                    to="/profile"
                    className={({ isActive }) => (isActive ? "active" : "")}
                >
                    <FaUserCircle />
                    Profile
                </NavLink>
            </nav>

            <button className="logout-btn" onClick={logout}>
                <FaSignOutAlt />
                Logout
            </button>
        </aside>
    );
}

export default Navbar;