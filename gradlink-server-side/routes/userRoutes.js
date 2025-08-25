const express = require("express");
const { getuser } = require("../controllers/userController");
const mySqlPool = require("../config/db");

// router obj
const router = express.Router();

// GET all users
router.get("/users", getuser);

// POST new user
router.post("/users", async (req, res) => {
  try {
    const { name, email, userType, createdAt } = req.body;

    if (!name || !email || !userType) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // Convert createdAt to MySQL DATETIME format if provided
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
