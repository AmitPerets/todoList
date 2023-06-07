const express = require("express");
const app = express();
const dotenv = require("dotenv");

dotenv.config();

const mongoose = require("mongoose");

app.use("/static", express.static("public"));

app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => console.log("Server Up and running"));
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.set("view engine", "ejs");


app.get('/', (req, res) => {
    res.render('todo.ejs');
});

app.post('/', (req, res) => {
    console.log(req.body);
});

