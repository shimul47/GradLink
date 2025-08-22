const express = require("express");
const { getAlumni } = require("../controllers/alumniController");

//router obj
const router = express.Router();

//routes
router.get("/alumnilist", getAlumni);

module.exports = router;
