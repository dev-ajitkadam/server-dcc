const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema({
  pName: String,
  cDate: Date,
  B: String,
  BB:String,
  M: String,
  L: String,
  pCode: String,
  Grade: String,
  totalCube: String,
  Day7: String,
  Day14: String,
  Day28: String,
});

const ScheduleModel = mongoose.model("Schedule", ScheduleSchema);

module.exports = ScheduleModel;

