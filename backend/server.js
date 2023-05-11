const express = require("express");
const cors = require("cors");
const app = express();
const bodyparser = require("body-parser");
app.use(cors());
app.use(bodyparser.json());

app.use("/api", require("./routes/apiRoutes"));
app.use("/account", require("./routes/userAccounts"));

app.listen(8000, () => {
  console.log("Server started in 8000");
});
