const db = require("../config/db");

const getdetails = async (req, res) => {
  try {
    const data = await db.query("select * from admin_db");
    if (!data) {
      return res.send("No data in DB");
    }
    res.send(data[0]);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getdetails };
