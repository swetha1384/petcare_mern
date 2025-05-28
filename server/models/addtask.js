const mongoose = require('mongoose');

const addTaskSchema = new mongoose.Schema({
  variety: String,
  task: String,
  date: String,
  userEmail: String,
  notified: {
    type: Boolean,
    default: false
  }
});

const AddtaskModel = mongoose.model('Addtask', addTaskSchema);

module.exports = AddtaskModel;
