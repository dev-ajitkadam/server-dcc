const express = require('express');
const router = express.Router();
const TaskModule = require('../models/taskData');

// Get all tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await TaskModule.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new task
router.post('/tasks', async (req, res) => {
  const { title, start, end, reminder1, reminder2 } = req.body;

  // Validate input
  if (!title || !start || !end) {
    return res.status(400).json({ message: 'Title, start date, and end date are required' });
  }

  const task = new TaskModule({
    title,
    start: new Date(start),
    end: new Date(end),
    reminder1: reminder1 ? new Date(reminder1) : null,
    reminder2: reminder2 ? new Date(reminder2) : null,
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.error('Error saving task:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete("/task/:id", async (req, res) => {
  try {
      const { id } = req.params; 
      const deletedTask = await TaskModule.findByIdAndDelete(id); 

      if (!deletedTask) {
          return res.status(404).json({ status: "Not Found", message: "Task not found" });
      }

      res.json({ status: "Success", message: "Task deleted successfully" });
  } catch (err) {
      res.status(500).json({ status: "Internal Server Error", message: err.message });
  }
});

module.exports = router;
