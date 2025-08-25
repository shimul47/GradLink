const express = require("express");
const mySqlPool = require("./config/db");
const app = express();
const cors = require("cors");

//accept frontend -- middleware
app.use(cors());

//define port
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
//checking connection
app.get("", (req, res) => {
  res.send("Page is running");
});

//routes
app.use(require("./routes/studentRoutes"));
app.use(require("./routes/alumniRoutes"));
app.use(require("./routes/adminRoutes"));

//
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
