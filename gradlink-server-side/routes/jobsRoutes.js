const express = require("express");
const {
  createJob,
  getJobs,
  applyJob,
  updateJobStatus,
} = require("../controllers/jobsController");

const router = express.Router();

router.post("/jobs", createJob);
router.get("/jobs", getJobs);
router.post("/jobs/apply", applyJob);
router.put("/jobs/:id", updateJobStatus);

module.exports = router;
