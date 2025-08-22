const express = require("express");
const { getStudents } = require("../controllers/studentController");

//router obj
const router = express.Router();

//routes
router.get("/studentlist", getStudents);

module.exports = router;
