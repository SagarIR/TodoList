const mongoose = require("mongoose");

mongoose.connect(
  process.env.DB_URL ||
    "mongodb+srv://Sagar:Ramani@todolist.poi7dr9.mongodb.net/",
  {
    useNewUrlParser: true,
  }
);
