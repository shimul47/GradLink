const express = require("express");
const { getuser } = require("../controllers/userController");
const mySqlPool = require("../config/db");

// router obj
const router = express.Router();

// GET all users
router.get("/users", getuser);
// GET userType by email
router.get("/users/userType/:email", async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const [rows] = await mySqlPool.execute(
      "SELECT userType FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ userType: rows[0].userType });
  } catch (error) {
    console.error("DB Query Error:", error.message);
    res.status(500).json({ message: error.message });
  }
});

// POST new user
router.post("/users", async (req, res) => {
  try {
    const { name, email, userType, createdAt } = req.body;

    if (!name || !email || !userType) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // Convert createdAt
    const mysqlDate = createdAt
      ? new Date(createdAt).toISOString().slice(0, 19).replace("T", " ")
      : new Date().toISOString().slice(0, 19).replace("T", " ");

    const [result] = await mySqlPool.execute(
      `INSERT INTO users (name, email,createdAt,userType)
       VALUES (?, ?, ?, ?)`,
      [name, email, mysqlDate, userType]
    );

    res.json({ success: true, insertedId: result.insertId });
  } catch (error) {
    console.error("DB Insert Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
