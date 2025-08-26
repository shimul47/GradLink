const express = require("express");
const { getStudents } = require("../controllers/studentController");

//router obj
const router = express.Router();

//get
router.get("/studentlist", getStudents);

//post
router.post("/students", async (req, res) => {
  try {
    const {
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
      VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await db.execute(query, [
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
