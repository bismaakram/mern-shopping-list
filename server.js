const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const PORT = 4000;
const app = express();
const items = require("./routes/api/items");
const path = require("path");
app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;

mongoose
  .connect(db)
  .then(() => console.log("Mongo DB Connected.."))
  .catch(err => console.log(err));

app.use("/api/items", items);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});
