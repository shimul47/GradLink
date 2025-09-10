const express = require("express");
const router = express.Router();
const {
  createMentorshipRequest,
  getMentorshipRequests,
  updateMentorshipRequestStatus,
} = require("../controllers/mentorshipRequestController");

// Create new request
router.post("/mentorship-request", createMentorshipRequest);

// Get all requests for a mentor
router.get("/mentorship-requests", getMentorshipRequests);

// Update request status
router.put("/mentorship-request/:id/status", updateMentorshipRequestStatus);

module.exports = router;
