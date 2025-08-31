const express = require("express");
const { getStudents } = require("../controllers/studentController");
const db = require("../config/db");
//router obj
const router = express.Router();

//get
router.get("/studentlist", getStudents);

//for profile
router.get("/studentlist/:userId", async (req, res) => {
  const { userId } = req.params;
  const [rows] = await db.query("SELECT * FROM students WHERE userId = ?", [
    userId,
  ]);
  if (!rows.length)
    return res.status(404).json({ message: "Student not found" });
  res.json(rows[0]);
});

//put request
//checking role
router.put("/studentlist/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;

    const verifiedAt = status === "verified" ? new Date() : null;

    const [result] = await db.query(
      "UPDATE students SET status = ?, verifiedAt = ? WHERE userId = ?",
      [status, verifiedAt, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student updated successfully" });
  } catch (err) {
    console.error("Error updating student:", err);
    res.status(500).json({ error: err.message });
  }
});

//udate-info
router.put("/student/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { fullName, department, batchYear, enrollmentStatus } = req.body;

    const [result] = await db.query(
      `UPDATE students 
       SET fullName = ?, department = ?, batchYear = ?, enrollmentStatus = ?
       WHERE userId = ?`,
      [fullName, department, batchYear, enrollmentStatus, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student updated successfully" });
  } catch (err) {
    console.error("Error updating student:", err);
    res.status(500).json({ error: err.message });
  }
});
//post
router.post("/students", async (req, res) => {
  try {
    const {
      userId,
      userType,
      officialEmail,
      studentId,
      department,
      fullName,
      status,
      verifiedAt,
      batchYear,
      enrollmentStatus,
    } = req.body;

    const query = `
      INSERT INTO students 
      (userId, userType, officialEmail, studentId, department, fullName, status, verifiedAt, batchYear, enrollmentStatus)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await db.execute(query, [
      userId,
      userType,
      officialEmail,
      studentId,
      department,
      fullName,
      status,
      verifiedAt,
      batchYear,
      enrollmentStatus,
    ]);

    res.json({ success: true, message: "Student created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
