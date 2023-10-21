import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const containerStyle = {
  textAlign: 'center',
  padding: '20px',
  backgroundImage:'url("https://img.freepik.com/free-vector/clean-medical-background_53876-97927.jpg")', 
  backgroundSize: 'cover',
  backgroundPosition: 'center', 
};

const headingStyle = {
  fontSize: '60px',
  color: 'royalblue',
  margin: '10px 0',
};

const inputStyle = {
  width: '50%',
  padding: '10px',
  marginLeft: '25%',
  marginRight: '25%',
  marginTop: '10px',
  fontSize: '16px',
};

const buttonStyle = {
  backgroundColor: 'red',
  color: 'white',
  padding: '10px 20px',
  margin: '10px',
  border: 'none',
  cursor: 'pointer',
};

function Register() {
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    contact: '',
    role: '',
    dob: '',
    gender: '',
    address: ''
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

  const handleRegister = () => {
    axios
      .post('http://localhost:5000/register', user) // Update the server URL
      .then((response) => {
        console.log(response.data.message);
        toast.success('User registered successfully');
        navigate('/login');
      })
      .catch((error) => {
        console.error('Registration failed:', error);
        toast.error('Registration failed');
        navigate('/');
      });
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Register</h2>
      <input
        style={inputStyle}
        type="text"
        name="first_name"
        placeholder="First Name"
        onChange={handleInputChange}
      />
      <input
        style={inputStyle}
        type="text"
        name="last_name"
        placeholder="Last Name"
        onChange={handleInputChange}
      />
      <input
        style={inputStyle}
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleInputChange}
      />
      <input
        style={inputStyle}
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleInputChange}
      />
      <input
        style={inputStyle}
        type="number"
        name="contact"
        placeholder="Contact"
        onChange={handleInputChange}
      />
      <input
        style={inputStyle}
        type="text"
        name="role"
        placeholder="Role"
        onChange={handleInputChange}
      />
      <input
        style={inputStyle}
        type="date"
        name="dob"
        placeholder="DOB"
        onChange={handleInputChange}
      />
      <input
        style={inputStyle}
        type="text"
        name="gender"
        placeholder="Gender"
        onChange={handleInputChange}
      />
      <input
        style={inputStyle}
        type="text"
        name="address"
        placeholder="Address"
        onChange={handleInputChange}
      />
      {/* Add input fields for other user fields here */}
      <button style={buttonStyle} onClick={handleRegister}>Register</button>
      <button style={buttonStyle} onClick={() => navigate('/login')}>Login</button>
      <button style={buttonStyle} onClick={() => navigate('/')}>Home</button>
    </div>
  );
}

export default Register;
