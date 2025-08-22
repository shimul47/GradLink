const db = require("../config/db");

const getAlumni = async (req, res) => {
  try {
    const data = await db.query("select * from alumni");
    if (!data) {
      return res.send("No data in DB");
    }
    res.send(data[0]);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getAlumni };
