const express = require("express");
const {
  getProject,
  createProject,
} = require("../controllers/projectController");
const router = express.Router();

// Get all projects
router.get("/projects", getProject);

// Create a new project
router.post("/projects", createProject);

module.exports = router;
