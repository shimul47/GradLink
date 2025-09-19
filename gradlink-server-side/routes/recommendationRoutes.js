const express = require("express");
const router = express.Router();
const {
  createRecommendationRequest,
  getAllRecommendationRequests,
  getRequestsForAlumni,
  updateRecommendationStatus,
  getRequestsForUser,
} = require("../controllers/recommendationController");

router.post("/recommendation-requests", createRecommendationRequest);

router.get("/recommendation-requests", getAllRecommendationRequests);
router.get("/recommendation-requests/user", getRequestsForUser);

router.get("/recommendation-requests/:alumniId", getRequestsForAlumni);

router.put("/recommendation-requests/:id", updateRecommendationStatus);

module.exports = router;
