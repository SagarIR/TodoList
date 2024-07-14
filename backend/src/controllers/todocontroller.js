const mongoose = require("mongoose");
const Todo = require("../models/todos");

const createTodo = async (req, res) => {
  try {
    const todoDetails = new Todo({
      ...req.body,
      owner: req.user._id,
    });
    const data = await todoDetails.save();
    res.status(201).send({ message: "Add SuccessFull", data });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

const editTodo = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["title", "description", "dueDate", "status"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Updates" });
  }

  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!todo) {
      return res.status(404).send();
    }

    res.send({ todo, message: "Edit SuccessFull" });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

const allTodos = async (req, res) => {
  try {
    const todos = await Todo.find({}).populate("owner");
    res.send(todos);
  } catch (e) {
    res.status(500).send(e);
  }
};

const deleteTodo = async (req, res) => {
  Todo.findByIdAndDelete(req.params.id)
    .populate("owner")
    .then((Property) => {
      res.send(Property);
    })
    .catch((e) => {
      res.status(500).send({ error: e.message });
    });
};

module.exports = {
  createTodo,
  editTodo,
  allTodos,
  deleteTodo,
};
