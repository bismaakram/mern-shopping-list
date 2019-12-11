const express = require("express");
const mongoose = require("mongoose");

const port = process.env.PORT || 5000;
const app = express();
const path = require("path");
app.use(express.json());

const db = require("./config/keys").mongoURI;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Mongo DB Connected.."))
  .catch(err => console.log(err));

app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.listen(port, function() {
  console.log("Server is running on Port: " + port);
});
