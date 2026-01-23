//const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');
const Task= require('../models/tasksModel');

exports.getAllTasks = async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
};

exports.getTaskById = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Tâche introuvable" });
  res.json(task);
};

exports.createTask = async (req, res) => {
  const { title, description, status } = req.body;
  const task = await Task.create({ title, description, status });
  res.status(201).json(task);
};

exports.updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!task) return res.status(404).json({ message: "Tâche introuvable" });
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).json({ message: "Tâche introuvable" });
  res.json({ message: "Tâche supprimée" });
};