const express = require("express");
const mySqlPool = require("./config/db");
const app = express();

if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
//routes
app.use("/student", require("./routes/studentRoutes"));
app.use("/alumni", require("./routes/alumniRoutes"));

let PORT = process.env.PORT || 8080;

//sql db connection
mySqlPool
  .query("select 1")
  .then(() => {
    console.log("SQL Connected");
    app.listen(PORT, () => {
      console.log(`App is listening to port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
