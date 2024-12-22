const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db"); 
const authRoutes = require("./routes/authRoutes");
const qRoutes = require("./routes/questionRoutes");
const gRoutes = require("./routes/gameRoutes");
const dRoutes = require("./routes/dashboard");
const pRoutes = require("./routes/profileRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json()); 
app.use("/api/auth", authRoutes); 
app.use("/api/questions", qRoutes); 
app.use("/api/games", gRoutes); 
app.use("/api/user", dRoutes); 
app.use("/api/profile", pRoutes); 
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
