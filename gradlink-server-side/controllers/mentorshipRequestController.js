const db = require("../config/db");

// Create mentorship request
const createMentorshipRequest = async (req, res) => {
  try {
    const {
      mentorId,
      senderId,
      mentorshipId,
      mentorshipTitle,
      message,
      goals,
      availability,
      skills,
      portfolioLink,
    } = req.body;

    if (!mentorId || !senderId || !mentorshipId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const skillsString =
      skills && skills.length > 0 ? JSON.stringify(skills) : null;

    const [result] = await db.query(
      `INSERT INTO mentorship_requests 
        (mentorId, senderId, mentorshipId, mentorshipTitle, message, goals, availability, skills, portfolioLink, status, submittedDate)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', NOW())`,
      [
        mentorId,
        senderId,
        mentorshipId,
        mentorshipTitle || null,
        message || null,
        goals || null,
        availability || null,
        skillsString,
        portfolioLink || null,
      ]
    );

    res
      .status(201)
      .json({ message: "Mentorship request created", id: result.insertId });
  } catch (err) {
    console.error("Error creating mentorship request:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all requests for a mentor
const getMentorshipRequests = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT * FROM mentorship_requests ORDER BY submittedDate DESC`
    );

    const requests = rows.map((row) => ({
      ...row,
      skills: row.skills ? JSON.parse(row.skills) : [],
    }));

    res.status(200).json({ requests });
  } catch (err) {
    console.error("Error fetching all mentorship requests:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update request status
const updateMentorshipRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "accepted", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    await db.query(`UPDATE mentorship_requests SET status = ? WHERE id = ?`, [
      status,
      id,
    ]);

    res.status(200).json({ message: `Request ${status}` });
  } catch (err) {
    console.error("Error updating request status:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createMentorshipRequest,
  getMentorshipRequests,
  updateMentorshipRequestStatus,
};
