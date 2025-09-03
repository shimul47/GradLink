const db = require("../config/db");

const applyJob = async (req, res) => {
  const { jobId, applicantUserId, applicantType, resumeLink, coverLetter } =
    req.body;

  try {
    const query = `
      INSERT INTO jobApplications
      (jobId, applicantUserId, applicantType, resumeLink, coverLetter)
      VALUES (?, ?, ?, ?, ?)
    `;
    await db.execute(query, [
      jobId,
      applicantUserId,
      applicantType,
      resumeLink || null,
      coverLetter || null,
    ]);
    res.json({ success: true, message: "Applied successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getApplicationsByJob = async (req, res) => {
  const { jobId } = req.params;
  try {
    const [rows] = await db.query(
      "SELECT * FROM jobApplications WHERE jobId = ?",
      [jobId]
    );
    res.json({ applications: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getApplicationsByUser = async (req, res) => {
  const { applicantUserId } = req.params;
  try {
    const [rows] = await db.query(
      "SELECT * FROM jobApplications WHERE applicantUserId = ?",
      [applicantUserId]
    );
    res.json({ applications: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { applyJob, getApplicationsByJob, getApplicationsByUser };
