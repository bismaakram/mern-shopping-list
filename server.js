const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const PORT = 4000;
const app = express();
const items = require("./routes/api/items");
const path = require("path");
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/list", { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

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
