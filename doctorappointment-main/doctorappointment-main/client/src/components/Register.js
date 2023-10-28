import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const containerStyle = {
    textAlign: "center",
    padding: "20px",
    backgroundImage:
        'url("https://img.freepik.com/free-vector/clean-medical-background_53876-97927.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
};

const headingStyle = {
    fontSize: "60px",
    color: "royalblue",
    margin: "10px 0",
};

const inputStyle = {
    width: "50%",
    padding: "10px",
    marginLeft: "25%",
    marginRight: "25%",
    marginTop: "10px",
    fontSize: "16px",
};

const buttonStyle = {
    backgroundColor: "red",
    color: "white",
    padding: "10px 20px",
    margin: "10px",
    border: "none",
    cursor: "pointer",
};

function Register() {
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        contact: "",
        role: "",
        dob: "",
        gender: "",
        address: "",
        // Add other user fields as needed
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleRegister = (e) => {
        e.preventDefault()
        axios
            .post("http://localhost:8080/api/signup", user) // Update the server URL
            .then((response) => {
                console.log(response.data);
                if (response.data.signup) {
                    toast.success("User registered successfully");
                    toast.warn('Check mail box to verify Email')
                    navigate("/login");
                }
                else {
                    toast.error('User Registration Failed')
                }
            })
            .catch((error) => {
                console.error("Registration failed:", error);
                toast.error("Registration failed");
                // navigate("/");
            });
    };

    return (
        <form onSubmit={handleRegister} style={containerStyle}>
            <h2 style={headingStyle}>Register</h2>
            <input
                style={inputStyle}
                type="text"
                name="first_name"
                placeholder="First Name"
                onChange={handleInputChange}
                required
            />
            <input
                style={inputStyle}
                type="text"
                name="last_name"
                placeholder="Last Name"
                onChange={handleInputChange}
                required
            />
            <input
                style={inputStyle}
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleInputChange}
                required
            />
            <input
                style={inputStyle}
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleInputChange}
                required
            />
            <input
                style={inputStyle}
                type="tel"
                name="contact"
                placeholder="Contact"
                onChange={handleInputChange}
                required
            />
            <input
                style={inputStyle}
                type="text"
                name="role"
                placeholder="Role"
                onChange={handleInputChange}
                required
            />
            <input
                style={inputStyle}
                type="date"
                name="dob"
                placeholder="DOB"
                onChange={handleInputChange}
                required
            />
            <input
                style={inputStyle}
                type="text"
                name="gender"
                placeholder="Gender"
                onChange={handleInputChange}
                required
            />
            <input
                style={inputStyle}
                type="text"
                name="address"
                placeholder="Address"
                onChange={handleInputChange}
                required
            />
            {/* Add input fields for other user fields here */}
            <button type="submit" style={buttonStyle}>
                Register
            </button>
            <button
                type="button"
                style={buttonStyle}
                onClick={() => navigate("/login")}
            >
                Login
            </button>
            <button type="button" style={buttonStyle} onClick={() => navigate("/")}>
                Home
            </button>
        </form>
    );
}

export default Register;
