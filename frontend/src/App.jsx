import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Reports from "./pages/Reports";
import Projects from "./pages/Projects";
import Profile from "./pages/Profile";
import MemberDashboard from "./pages/MemberDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import Assignments from "./pages/Assignments";

function App() {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route
                path="/profile"
                element={token ? <Profile /> : <Navigate to="/login" />}
            />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
                path="/reports"
                element={token ? <Reports /> : <Navigate to="/login" />}
            />

            <Route
                path="/projects"
                element={token ? <Projects /> : <Navigate to="/login" />}
            />

            <Route
                path="/member"
                element={token ? <MemberDashboard /> : <Navigate to="/login" />}
            />

            <Route
                path="/manager"
                element={
                    token && role === "MANAGER" ? (
                        <ManagerDashboard />
                    ) : (
                        <Navigate to="/login" />
                    )
                }
            />

            <Route
                path="/assignments"
                element={
                    token && role === "MANAGER" ? (
                        <Assignments />
                    ) : (
                        <Navigate to="/login" />
                    )
                }
            />
        </Routes>
    );
}

export default App;