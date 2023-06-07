const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const TodoTask = require("./models/TodoTask");

dotenv.config();


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


app.get("/", async (req, res) => {
  try {
    const tasks = await TodoTask.find({});
    res.render("todo.ejs", { todoTasks: tasks });
  } catch (err) {
    console.error(err);
  }
});

app.post('/',async (req, res) => {
    const todoTask = new TodoTask({
    content: req.body.content
    });
    try {
    await todoTask.save();
    res.redirect("/");
    } catch (err) {
    res.redirect("/");
    }
    });
