const express = require("express");
const router = express.Router();
const {
  createMentorship,
  getMentorship,
  getAllMentorship,
} = require("../controllers/mentorshipController");

// Routes
router.post("/mentor", createMentorship);
router.get("/mentor/:creatorId", getMentorship);
router.get("/getallmentorship", getAllMentorship);

module.exports = router;
