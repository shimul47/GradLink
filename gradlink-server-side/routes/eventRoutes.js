const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/eventController");

// Create a new event
router.post("/events", eventsController.createEvent);

// Get all events
router.get("/events", eventsController.getEvents);

// Get single event by ID
router.get("/events/:id", eventsController.getEventById);

router.get("/creator/:creatorId", eventsController.getEventsByCreator);

module.exports = router;
