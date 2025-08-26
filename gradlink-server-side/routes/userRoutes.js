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

    // Convert createdAt
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
    const verificationData = req.body;

    if (
      !verificationData ||
      !verificationData.userType ||
      !verificationData.userId
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const {
      userId,
      userType,
      officialEmail,
      studentId,
      department,
      fullName,
      batchYear,
      graduationYear,
      company,
    } = verificationData;

    // Check if user already exists
    let existingQuery, existingParams;
    if (userType === "student") {
      existingQuery = `SELECT * FROM students WHERE studentId = ? OR officialEmail = ?`;
      existingParams = [studentId, officialEmail];
    } else if (userType === "alumni") {
      existingQuery = `SELECT * FROM alumni WHERE studentId = ? OR officialEmail = ?`;
      existingParams = [studentId, officialEmail];
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid userType" });
    }

    const [rows] = await mySqlPool.execute(existingQuery, existingParams);

    if (rows.length > 0) {
      return res.json({
        success: false,
        status: "verified",
        message: "This user is already verified",
      });
    }

    // Insert into appropriate table
    const verifiedAt = new Date().toISOString();
    const status = "verified";
    let insertQuery, insertParams;

    if (userType === "student") {
      insertQuery = `
        INSERT INTO students 
        (userId, userType, officialEmail, studentId, department, fullName, status, verifiedAt, batchYear, enrollmentStatus)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      insertParams = [
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
      ];
    } else if (userType === "alumni") {
      insertQuery = `
        INSERT INTO alumni 
        (userId, userType, officialEmail, studentId, department, fullName, status, verifiedAt, graduationYear, company, currentPosition)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      insertParams = [
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
      ];
    }

    await mySqlPool.execute(insertQuery, insertParams);

    res.json({
      success: true,
      autoVerified: true,
      message: `${userType} account verified and created successfully!`,
    });
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
