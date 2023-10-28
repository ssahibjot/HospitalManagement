import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import UserHome from "./components/User";
import NewAppointment from "./components/NewAppointment";
import EmailVerification from "./components/EmailVerification";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DoctorPage from "./components/Doctor";

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<UserHome />} />
                    <Route path="/newappointment" element={<NewAppointment />} />
                    <Route path="/verify-email" element={<EmailVerification />} />
                    <Route path="/appointments" element={<DoctorPage />} />
                </Routes>
            </div>
            <ToastContainer />
        </Router>
    );
}

export default App;
