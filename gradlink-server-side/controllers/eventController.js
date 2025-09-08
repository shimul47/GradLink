const mySqlPool = require("../config/db");

// Create Event
exports.createEvent = async (req, res) => {
  try {
    // Destructure data from JSON body
    const {
      title,
      description,
      category,
      location,
      isVirtual,
      virtualLink,
      date,
      time,
      endTime,
      price,
      capacity,
      creatorId,
      responderId,
    } = req.body;

    // Basic validation
    if (!title || !description || !category || !date || !time || !endTime) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Check if creator is an alumni
    const [alumniCheck] = await mySqlPool.query(
      "SELECT * FROM alumni WHERE userId = ?",
      [creatorId]
    );
    if (alumniCheck.length === 0) {
      return res
        .status(403)
        .json({ message: "Only alumni can create events." });
    }

    // Optional: validate responderId (student or alumni)
    if (responderId) {
      const [studentCheck] = await mySqlPool.query(
        "SELECT * FROM students WHERE userId = ?",
        [responderId]
      );
      const [alumniResponderCheck] = await mySqlPool.query(
        "SELECT * FROM alumni WHERE alumniId = ?",
        [responderId]
      );

      if (studentCheck.length === 0 && alumniResponderCheck.length === 0) {
        return res
          .status(400)
          .json({ message: "Responder must be a student or alumni." });
      }
    }

    // Insert event into database
    const [result] = await mySqlPool.query(
      `INSERT INTO events 
      (title, description, category, location, is_virtual, virtual_link, date, start_time, end_time, price, capacity, creatorId, responderId)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        description,
        category,
        location || null,
        isVirtual || false,
        virtualLink || null,
        date,
        time,
        endTime,
        price || 0.0,
        capacity || null,
        creatorId,
        responderId || null,
      ]
    );

    res.status(201).json({
      message: "Event created successfully",
      eventId: result.insertId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err });
  }
};

// Get all events
exports.getEvents = async (req, res) => {
  try {
    const [events] = await mySqlPool.query(
      "SELECT * FROM events ORDER BY created_at DESC"
    );
    res.status(200).json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err });
  }
};

// Get single event
exports.getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const [event] = await mySqlPool.query("SELECT * FROM events WHERE id = ?", [
      id,
    ]);

    if (event.length === 0) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err });
  }
};

exports.getEventsByCreator = async (req, res) => {
  try {
    const { creatorId } = req.params;

    const [events] = await mySqlPool.query(
      "SELECT * FROM events WHERE creatorId = ? ORDER BY created_at DESC",
      [creatorId]
    );

    res.status(200).json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err });
  }
};
