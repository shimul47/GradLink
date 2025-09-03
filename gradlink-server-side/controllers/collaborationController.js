const db = require("../config/db");

const createCollaborationRequest = async (req, res) => {
  try {
    const {
      projectId,
      senderUserId,
      receiverUserId,
      message,
      requestedRole,
      availability,
      portfolioLink,
      skills,
    } = req.body;

    if (!projectId || !senderUserId || !receiverUserId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // const skillsString = skills ? skills.join(",") : null;
    const skillsString =
      skills && skills.length > 0 ? JSON.stringify(skills) : null;
    const [result] = await db.query(
      `INSERT INTO collaboration_requests 
       (projectId, senderUserId, receiverUserId, message, requestedRole, availability, portfolioLink, skills, date) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        projectId,
        senderUserId,
        receiverUserId,
        message || null,
        requestedRole || null,
        availability || null,
        portfolioLink || null,
        skillsString,
      ]
    );

    res
      .status(201)
      .json({ message: "Collaboration request created", id: result.insertId });
  } catch (err) {
    console.error("Error creating collaboration request:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get
const getCollaborationRequests = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: "Missing userId" });
    }

    const [rows] = await db.query(
      `SELECT cr.*,
              cr.senderUserId,
              cr.receiverUserId,
              p.title AS projectTitle
       FROM collaboration_requests cr
       JOIN projects p ON cr.projectId = p.projectId
       WHERE cr.receiverUserId = ?
       ORDER BY cr.date DESC`,
      [userId]
    );

    const collaborations = rows.map((row) => ({
      ...row,
      skills: typeof row.skills === "string" ? JSON.parse(row.skills) : [],
    }));

    res.status(200).json({ collaborations });
  } catch (err) {
    console.error("Error fetching collaboration requests:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update
const updateCollaborationRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "accepted", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    await db.query(
      `UPDATE collaboration_requests SET status = ? WHERE id = ?`,
      [status, id]
    );

    res.status(200).json({ message: `Request ${status}` });
  } catch (err) {
    console.error("Error updating collaboration status:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createCollaborationRequest,
  getCollaborationRequests,
  updateCollaborationRequestStatus,
};
