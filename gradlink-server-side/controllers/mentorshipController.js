const db = require("../config/db");

// Create mentorship offering
exports.createMentorship = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      specialties,
      experience,
      availability,
      isRemote,
      location,
      sessionFormat,
      sessionLength,
      price,
      maxMentees,
      creatorId,
    } = req.body;

    const [result] = await db.query(
      `INSERT INTO mentorship_offerings 
      (title, description, category, specialties, experience, availability, is_remote, location, session_format, session_length, price, max_mentees, creatorId)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        description,
        category,
        JSON.stringify(specialties),
        experience,
        availability,
        isRemote,
        location,
        sessionFormat,
        sessionLength,
        price || 0.0,
        maxMentees || null,
        creatorId,
      ]
    );

    res.json({ success: true, id: result.insertId });
  } catch (err) {
    console.error("Error creating mentorship:", err);
    res.status(500).json({
      success: false,
      message: "Failed to create mentorship offering",
    });
  }
};

// Get mentorships created by specific user
exports.getMentorship = async (req, res) => {
  try {
    const { creatorId } = req.params;
    const [rows] = await db.query(
      "SELECT * FROM mentorship_offerings WHERE creatorId = ?",
      [creatorId]
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching mentorships:", err);
    res
      .status(500)
      .json({ success: false, message: "Error fetching mentorship offerings" });
  }
};
exports.getAllMentorship = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM mentorship_offerings");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching mentorships:", err);
    res
      .status(500)
      .json({ success: false, message: "Error fetching mentorship offerings" });
  }
};
