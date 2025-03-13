const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema({
  pName: String,
  t_id: String,
  cDate: Date,
  B: String,
  BB:String,
  M: String,
  L: String,
  pCode: String,
  Grade: String,
  totalCube: String,
  Day7:{default: "Pending", type: String},
  Day14:{default: "Pending", type: String},
  Day28:{default: "Pending", type: String},
  Day7ID:{default: "NaN", type: String},
  Day14ID:{default: "NaN", type: String},
  Day28ID:{default: "NaN", type: String},
  Day7Date:String,
  Day14Date:String,
  Day28Date:String,
  siteEngName: String,
  siteEngEmail: String
});

const ScheduleModel = mongoose.model("Schedule", ScheduleSchema);

module.exports = ScheduleModel;

