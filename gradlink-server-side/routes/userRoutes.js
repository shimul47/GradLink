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

    return res.json({ userType: rows[0].userType });
  } catch (error) {
    console.error("DB Query Error:", error.message);
    res.status(500).json({ message: error.message });
  }
});

// POST new user
router.post("/users", async (req, res) => {
  try {
    const { userId, name, email, userType, createdAt } = req.body;

    if (!userId || !name || !email || !userType) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const mysqlDate = createdAt
      ? new Date(createdAt).toISOString().slice(0, 19).replace("T", " ")
      : new Date().toISOString().slice(0, 19).replace("T", " ");

    const [result] = await mySqlPool.execute(
      `INSERT INTO users (userId,name, email,createdAt,userType)
       VALUES (?,?, ?, ?, ?)`,
      [userId, name, email, mysqlDate, userType]
    );

    res.json({ success: true, insertedId: result.insertId });
  } catch (error) {
    console.error("DB Insert Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

//post -- verify user

router.post("/verify-user", async (req, res) => {
  try {
    const {
      userId,
      userType,
      fullName,
      studentId,
      officialEmail,
      department,
      batchYear,
      graduationYear,
      company,
    } = req.body;

    if (!userId || !userType || !studentId || !officialEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // Check if user already exists in students/alumni
    const tableName = userType === "student" ? "students" : "alumni";
    const [existingRows] = await mySqlPool.execute(
      `SELECT status FROM ${tableName} WHERE studentId = ?`,
      [studentId]
    );

    if (existingRows.length > 0) {
      return res.json({
        success: false,
        status: existingRows[0].status,
        message:
          existingRows[0].status === "verified"
            ? "Your account is already verified."
            : "Your account is pending admin approval.",
      });
    }

    // Check admin_db for verification
    const [adminRows] = await mySqlPool.execute(
      "SELECT * FROM admin_db WHERE studentID = ? AND name = ? AND email = ? AND department = ? AND userType = ?",
      [studentId, fullName, officialEmail, department, userType]
    );

    const isVerified = adminRows.length > 0;
    const status = isVerified ? "verified" : "pending";
    const verifiedAt = new Date().toISOString().slice(0, 19).replace("T", " ");

    // Insert into students or alumni table
    if (userType === "student") {
      await mySqlPool.execute(
        `INSERT INTO students
          (userId, userType, officialEmail, studentId, department, fullName, status, verifiedAt, batchYear, enrollmentStatus)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          userId,
          userType,
          officialEmail,
          studentId,
          department,
          fullName,
          status,
          verifiedAt,
          batchYear,
          "current",
        ]
      );
    } else if (userType === "alumni") {
      await mySqlPool.execute(
        `INSERT INTO alumni
          (userId, userType, officialEmail, studentId, department, fullName, status, verifiedAt, graduationYear, company, currentPosition)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          userId,
          userType,
          officialEmail,
          studentId,
          department,
          fullName,
          status,
          verifiedAt,
          graduationYear,
          company || "",
          "",
        ]
      );
    }

    res.json({
      success: true,
      status,
      message:
        status === "verified"
          ? "Your account is verified and created successfully!"
          : "Your account is pending admin approval. Please wait for verification.",
    });
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
