const express = require("express");
const {
  getProjects,
  createProject,
} = require("../controllers/projectController");
const router = express.Router();

// Get all projects
router.get("/projects", getProjects);

// Create a new project
router.post("/projects", createProject);

module.exports = router;
