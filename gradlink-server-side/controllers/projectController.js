const db = require("../config/db");

// Get all projects
const getProjects = async (req, res) => {
  try {
    const { userId } = req.query;
    let query = "SELECT * FROM projects";
    const params = [];

    if (userId) {
      query += " WHERE userId = ?";
      params.push(userId);
    }

    query += " ORDER BY createdAt DESC";

    const [rows] = await db.query(query, params);

    const projects = rows.map((project) => {
      let techStacksArray = [];

      if (project.techStacks) {
        try {
          techStacksArray = JSON.parse(project.techStacks);
          if (!Array.isArray(techStacksArray)) techStacksArray = [];
        } catch (err) {
          techStacksArray = [];
        }
      }

      return {
        projectId: project.projectId,
        userId: project.userId,
        title: project.title,
        description: project.description,
        category: project.category,
        status: project.status,
        startDate: project.startDate,
        endDate: project.endDate,
        maxMembers: project.maxMembers,
        techStacks: techStacksArray,
        createdAt: project.createdAt,
      };
    });

    res.status(200).json({ success: true, projects });
  } catch (err) {
    console.error("Error fetching projects:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch projects" });
  }
};

// Create a new project
const createProject = async (req, res) => {
  try {
    const {
      userId,
      title,
      description,
      category,
      status = "planning",
      startDate = null,
      endDate = null,
      maxMembers = null,
      techStacks = [],
    } = req.body;

    if (!userId || !title || !description || !category) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields are missing" });
    }

    const [result] = await db.query(
      `INSERT INTO projects 
      (userId, title, description, category, status, startDate, endDate, maxMembers, techStacks) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        title,
        description,
        category,
        status,
        startDate,
        endDate,
        maxMembers,
        JSON.stringify(techStacks),
      ]
    );

    res.status(201).json({
      success: true,
      message: "Project created",
      projectId: result.insertId,
    });
  } catch (err) {
    console.error("Error creating project:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to create project" });
  }
};

// Create a collaboration request
const createCollaborationRequest = async (req, res) => {
  try {
    const {
      projectId,
      senderUserId,
      message,
      requestedRole,
      availability,
      skills,
      portfolioLink,
    } = req.body;

    if (
      !projectId ||
      !senderUserId ||
      !message ||
      !requestedRole ||
      !availability ||
      !skills
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields are missing" });
    }

    // Get receiverUserId (project creator)
    const [projectRows] = await db.query(
      "SELECT userId FROM projects WHERE projectId = ?",
      [projectId]
    );

    if (projectRows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    const receiverUserId = projectRows[0].userId;

    // Insert collaboration request
    await db.query(
      `INSERT INTO collaboration_requests 
      (projectId, senderUserId, receiverUserId, message, requestedRole, availability, portfolioLink, skills) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        projectId,
        senderUserId,
        receiverUserId,
        message,
        requestedRole,
        availability,
        portfolioLink || null,
        JSON.stringify(skills.split(",").map((s) => s.trim())),
      ]
    );

    res
      .status(201)
      .json({ success: true, message: "Collaboration request sent" });
  } catch (err) {
    console.error("Error creating collaboration request:", err);
    res.status(500).json({
      success: false,
      message: "Failed to create collaboration request",
    });
  }
};

module.exports = { getProjects, createProject, createCollaborationRequest };
