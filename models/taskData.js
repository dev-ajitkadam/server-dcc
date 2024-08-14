const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  reminder1: { type: Date, default: null },
  reminder2: { type: Date, default: null },
});

module.exports = mongoose.model('TaskModule', TaskSchema);
