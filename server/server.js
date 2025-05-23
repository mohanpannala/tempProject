const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: 'https://tempproject1.vercel.app',
    methods: ['POST', 'GET'],
    credentials: true
}));
app.use(express.json());

// MongoDB connection (optimized for serverless)
let isConnected;

const connectDB = async () => {
    if (isConnected) return;
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        isConnected = mongoose.connection.readyState;
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
    }
};
connectDB(); // Initialize connection when server starts

// User schema and model
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Default route
app.get('/', (req, res) => {
    res.send('Server is running.');
});

// Favicon route
app.get('/favicon.ico', (req, res) => {
    res.status(204); // No content for favicon request
});

// Registration route
app.post('/register', async (req, res) => {
    await connectDB(); // Ensure DB connection

    const { username, email, password, conformPassword } = req.body;

    if (password !== conformPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User Registered Successfully" });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});

// Login route
app.post('/login', async (req, res) => {
    await connectDB(); // Ensure DB connection

    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});

// Starting the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
