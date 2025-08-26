const express = require("express");
const { getdetails } = require("../controllers/adminController");
const { getAdmin } = require("../controllers/privateAdmin");

//router obj
const router = express.Router();

//routes
router.get("/verification", getdetails);
router.get("/university-database", getdetails);

//route for only adminlist
router.get("/adminlist", getAdmin);
module.exports = router;
