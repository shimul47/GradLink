const db = require("../config/db");

const getAdmin = async (req, res) => {
  try {
    const data = await db.query("select * from admin");
    if (!data) {
      return res.send("No data in DB");
    }
    res.send(data[0]);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getAdmin };
