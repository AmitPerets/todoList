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


 app.route("/edit/:id")
  .get(async (req, res) => {
    try {
      const id = req.params.id;
      const tasks = await TodoTask.find({});
      res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
    } catch (err) {
      console.error(err);
      // Handle the error
    }
  })
  .post(async (req, res) => {
    try {
      const id = req.params.id;
      await TodoTask.findByIdAndUpdate(id, { content: req.body.content });
      res.redirect("/");
    } catch (err) {
      console.error(err);
      // Handle the error
      res.status(500).send(err);
    }
  });

  app.route("/remove/:id").get(async (req, res) => {
    try {
      const id = req.params.id;
      await TodoTask.findByIdAndRemove(id);
      res.redirect("/");
    } catch (err) {
      console.error(err);
      // Handle the error
      res.status(500).send(err);
    }
  });
  

  
