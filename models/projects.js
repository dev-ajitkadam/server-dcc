const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  cName: String,
  cAddress: String,
  name: String,
  address: String,
  projectId:String,
  email: String,
  number: String,
  status: {
    type: String,
    default: 'pending'
  },
  siteengName: {
    type: String,
    default: 'siteeng'
  },
});

const ProjectModel = mongoose.model("Project", ProjectSchema);

module.exports = ProjectModel;
