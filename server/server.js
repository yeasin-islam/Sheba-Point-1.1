const express = require("express");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const patientRoutes = require("./routes/patientRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const sslPaymentRoutes = require("./routes/sslPaymentRoutes");
const aiChat = require('./routes/aiassistantRouter');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for form-data (SSLCommerz sends this)


// Routes
app.use("/users", userRoutes);
app.use("/doctors", doctorRoutes);
app.use("/patients", patientRoutes);

app.use("/appointments", appointmentRoutes);
app.use("/sslPayment", sslPaymentRoutes);
app.use("/ai-chat", aiChat);

app.get("/", (req, res) => {
    res.send("ShebaPoint server is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
