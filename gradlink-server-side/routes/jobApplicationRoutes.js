const express = require("express");
const db = require("../config/db");
const router = express.Router();

router.post("/applications", async (req, res) => {
  const { jobId, applicantUserId, userType, message, portfolioLink, skills } =
    req.body;
  try {
    const query = `
      INSERT INTO job_applications
      (jobId, applicantUserId, userType, message, portfolioLink, skills)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    await db.execute(query, [
      jobId,
      applicantUserId,
      userType,
      message,
      portfolioLink || null,
      JSON.stringify(skills || []),
    ]);
    res.json({ success: true, message: "Applied successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get
router.get("/applications/:jobId", async (req, res) => {
  const { jobId } = req.params;
  try {
    const [rows] = await db.query(
      "SELECT * FROM job_applications WHERE jobId = ?",
      [jobId]
    );
    res.json({ applications: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update
router.put("/applications/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const [result] = await db.execute(
      "UPDATE job_applications SET status = ? WHERE id = ?",
      [status, id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Application not found" });
    res.json({ success: true, message: "Application updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
