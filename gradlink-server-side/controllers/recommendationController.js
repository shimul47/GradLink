const db = require("../config/db");

// Create new recommendation request
const createRecommendationRequest = async (req, res) => {
  try {
    const {
      alumniId,
      alumniName,
      studentId,
      studentName,
      requesterId,
      requestType,
      company,
      position,
      university,
      program,
      deadline,
      githubLink,
      portfolioLink,
      message,
      additionalInfo,
    } = req.body;

    if (
      !alumniId ||
      !alumniName ||
      !studentId ||
      !studentName ||
      !requestType ||
      !message
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const [result] = await db.query(
      `INSERT INTO recommendation_requests 
        (alumniId, alumniName, studentId, studentName, requesterId, requestType, company, position, university, program, deadline, githubLink, portfolioLink, message, additionalInfo, status, submittedDate)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', NOW())`,
      [
        alumniId,
        alumniName,
        studentId,
        studentName,
        requesterId,
        requestType,
        company || null,
        position || null,
        university || null,
        program || null,
        deadline || null,
        githubLink || null,
        portfolioLink || null,
        message,
        additionalInfo || null,
      ]
    );

    res
      .status(201)
      .json({ message: "Recommendation request created", id: result.insertId });
  } catch (err) {
    console.error("Error creating recommendation request:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all recommendation requests
const getAllRecommendationRequests = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT * FROM recommendation_requests ORDER BY submittedDate DESC`
    );
    res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching recommendation requests:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get requests for a specific alumni
const getRequestsForAlumni = async (req, res) => {
  try {
    const { alumniId } = req.params;
    const [rows] = await db.query(
      `SELECT * FROM recommendation_requests WHERE alumniId = ? ORDER BY submittedDate DESC`,
      [alumniId]
    );
    res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching requests for alumni:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update request status
const updateRecommendationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "accepted", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    await db.query(
      `UPDATE recommendation_requests SET status = ? WHERE id = ?`,
      [status, id]
    );
    res.status(200).json({ message: `Request marked as ${status}` });
  } catch (err) {
    console.error("Error updating recommendation status:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getRequestsForUser = async (req, res) => {
  try {
    const { requesterId, alumniId } = req.query;

    let query = "";
    let values = [];

    if (requesterId) {
      query = "SELECT * FROM recommendation_requests WHERE requesterId = ?";
      values = [requesterId];
    } else if (alumniId) {
      query = "SELECT * FROM recommendation_requests WHERE alumniId = ?";
      values = [alumniId];
    } else {
      return res.status(400).json({ error: "Missing requesterId or alumniId" });
    }

    const [rows] = await db.query(query, values);

    res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching recommendation requests:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
  createRecommendationRequest,
  getAllRecommendationRequests,
  getRequestsForAlumni,
  updateRecommendationStatus,
  getRequestsForUser, // export new controller
};
