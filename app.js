const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const TodoTask = require("./models/Task");

const loginDetails = require("./models/User");

dotenv.config();


app.use("/static", express.static("public"));

app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3002, () => console.log("Server Up and running"));
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.set("view engine", "ejs");


app.get("/", async (req, res) => {
  try {
    const Details = await loginDetails.find({});
    res.render("registration.ejs", { loginDetails: Details });
  } catch (err) {
    console.error(err);
  }
});

//Login page part
// app.get("/", async (req, res) => {
//   try {
//     const details = await loginDetails.find({});
//     res.render("login.ejs", { loginDetails: details });
//   } catch (err) {
//     console.error(err);
//   }
// });

// app.post("/", async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const user = await loginDetails.findOne({ username: username });
//     if (user && user.password === password) {
//       // Username and password are correct, redirect to the next page
//       res.redirect("/todo.ejs");
//     } else {
//       // Username or password is incorrect, handle the error
//       res.render("login.ejs", { error: "Invalid username or password" });
//     }
//   } catch (err) {
//     console.error(err);
//     // Handle any other errors that occurred during the database query
//     res.render("login.ejs", { error: "An error occurred" });
//   }
// });



// app.get("/", async (req, res) => {
//   try {
//     const tasks = await TodoTask.find({});
//     res.render("todo.ejs", { todoTasks: tasks });
//   } catch (err) {
//     console.error(err);
//   }
// });

// app.post('/', async (req, res) => {
//   const todoTask = new TodoTask({
//     content: req.body.content
//   });
//   try {
//     await todoTask.save();
//     res.redirect("/");
//   } catch (err) {
//     res.redirect("/");
//   }
// });


// app.route("/edit/:id")
//   .get(async (req, res) => {
//     try {
//       const id = req.params.id;
//       const tasks = await TodoTask.find({});
//       res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
//     } catch (err) {
//       console.error(err);
//       // Handle the error
//     }
//   })
//   .post(async (req, res) => {
//     try {
//       const id = req.params.id;
//       await TodoTask.findByIdAndUpdate(id, { content: req.body.content });
//       res.redirect("/");
//     } catch (err) {
//       console.error(err);
//       // Handle the error
//       res.status(500).send(err);
//     }
//   });

// app.route("/remove/:id").get(async (req, res) => {
//   try {
//     const id = req.params.id;
//     await TodoTask.findByIdAndRemove(id);
//     res.redirect("/");
//   } catch (err) {
//     console.error(err);
//     // Handle the error
//     res.status(500).send(err);
//   }
// });


