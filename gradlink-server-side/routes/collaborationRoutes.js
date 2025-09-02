const express = require("express");
const router = express.Router();
const {
  createCollaborationRequest,
  getCollaborationRequests,
  updateCollaborationRequestStatus,
} = require("../controllers/collaborationController");

router.get("/collaboration-requests", getCollaborationRequests);
router.post("/collaboration-requests", createCollaborationRequest);

router.put(
  "/collaboration-requests/:id/status",
  updateCollaborationRequestStatus
);

module.exports = router;
