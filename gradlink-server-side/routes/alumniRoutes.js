const express = require("express");
const { getAlumni } = require("../controllers/alumniController");
const db = require("../config/db");
//router obj
const router = express.Router();

//routes
router.get("/alumnilist", getAlumni);

//for profile
router.get("/alumnilist/:userId", async (req, res) => {
  const { userId } = req.params;
  const [rows] = await db.query("SELECT * FROM alumni WHERE userId = ?", [
    userId,
  ]);
  if (!rows.length)
    return res.status(404).json({ message: "Alumni not found" });
  res.json(rows[0]);
});

//put requst
router.put("/alumnilist/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;

    const verifiedAt = status === "verified" ? new Date() : null;

    const [result] = await db.query(
      "UPDATE alumni SET status = ?, verifiedAt = ? WHERE userId = ?",
      [status, verifiedAt, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Alumni not found" });
    }

    res.json({ message: "Alumni updated successfully" });
  } catch (err) {
    console.error("Error updating alumni:", err);
    res.status(500).json({ error: err.message });
  }
});

//udate-info
router.put("/alumni/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { fullName, department, graduationYear, company, currentPosition } =
      req.body;

    const [result] = await db.query(
      `UPDATE alumni
       SET fullName = ?, department = ?, graduationYear = ?, company = ?, currentPosition = ?
       WHERE userId = ?`,
      [fullName, department, graduationYear, company, currentPosition, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Alumni not found" });
    }

    res.json({ message: "Alumni updated successfully" });
  } catch (err) {
    console.error("Error updating alumni:", err);
    res.status(500).json({ error: err.message });
  }
});

//post
router.post("/alumni", async (req, res) => {
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
      graduationYear,
      company,
      currentPosition,
    } = req.body;

    const query = `
      INSERT INTO alumni
      (userId, userType, officialEmail, studentId, department, fullName, status, verifiedAt, batchYear, graduationYear, company, currentPosition)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
      graduationYear,
      company,
      currentPosition,
    ]);

    res.json({ success: true, message: "Alumni created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
