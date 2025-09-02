const express = require("express");
const mySqlPool = require("./config/db");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Load environment variables
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// check
app.get("/", (req, res) => {
  res.send("Page is running");
});

// Routes
app.use(require("./routes/studentRoutes"));
app.use(require("./routes/alumniRoutes"));
app.use(require("./routes/adminRoutes"));
app.use(require("./routes/userRoutes"));
app.use(require("./routes/projectRoutes"));
app.use(require("./routes/collaborationRoutes"));
const jobRoutes = require("./routes/jobsRoutes");
app.use("/", jobRoutes);
// Define port
const PORT = process.env.PORT || 8080;

// SQL DB connection
mySqlPool
  .query("select 1")
  .then(() => {
    console.log("SQL Connected");
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB Connection Error:", err);
  });
