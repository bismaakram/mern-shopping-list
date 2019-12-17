const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 5000;
const app = express();
const path = require("path");
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/shoppinglist", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully..");
});

app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.listen(port, function() {
  console.log("Server is running on Port: " + port);
});
