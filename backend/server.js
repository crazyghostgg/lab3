const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Імпорт роута для води
const waterRoutes = require("./waterRoutes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Підключення до MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/eco-lab3")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// Використання роута
app.use("/api/water", waterRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
