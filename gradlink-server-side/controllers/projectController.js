const db = require("../config/db");

// Get all projects
const getProject = async (req, res) => {
  try {
    const userId = req.query.userId;
    let query = "SELECT * FROM projects";
    let params = [];

    if (userId) {
      query += " WHERE userId = ?";
      params.push(userId);
    }

    query += " ORDER BY createdAt DESC";

    const [rows] = await db.query(query, params);

    const projects = rows.map((project) => {
      let techStacksArray = [];

      if (project.techStacks) {
        techStacksArray = Array.isArray(project.techStacks)
          ? project.techStacks
          : [];
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

    res.status(200).json({ projects });
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ message: "Failed to fetch projects" });
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
      return res.status(400).json({ message: "Required fields are missing" });
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

    res
      .status(201)
      .json({ message: "Project created", projectId: result.insertId });
  } catch (err) {
    console.error("Error creating project:", err);
    res.status(500).json({ message: "Failed to create project" });
  }
};

module.exports = { getProject, createProject };
