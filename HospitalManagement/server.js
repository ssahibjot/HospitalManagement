const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB (update the URL with your MongoDB connection)
mongoose.connect('mongodb+srv://test:test@cluster0.mwdclke.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the user schema and model
const User = mongoose.model('User', {
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  contact: String,
  role: String,
  dob: String,
  gender: String,
  address: String

  // Other user fields from your data structure
});

// Registration route
app.post('/register', async (req, res) => {
  try {
    const { first_name, last_name, email, password, contact, role, dob, gender, address } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Create a new user
    const user = new User({
      first_name,
      last_name,
      email,
      password, // Note: In production, hash and salt the password
      contact,
      role,
      dob,
      gender,
      address
      // Set other user fields as needed
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email (you should verify the password in a secure way)
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.password === password) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Incorrect password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Login failed' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
