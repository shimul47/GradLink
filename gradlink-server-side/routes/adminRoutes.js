const express = require("express");
const { getdetails } = require("../controllers/adminController");

//router obj
const router = express.Router();

//routes
router.get("/verification", getdetails);

module.exports = router;
