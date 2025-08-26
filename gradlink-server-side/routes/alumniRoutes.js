const express = require("express");
const { getAlumni } = require("../controllers/alumniController");

//router obj
const router = express.Router();

//routes
router.get("/alumnilist", getAlumni);

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
