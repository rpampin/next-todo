const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Todo = new Schema({
  // folder: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Folder"
  // },
  title: {
    type: String,
    required: true
  },
  notes: {
    type: String
  },
  date: {
    type: Date
  },
  dueDate: {
    type: Date
  },
  priority: {
    type: String,
    enum: ["High", "Medium", "Low"]
  }
});

export default mongoose.models.Todo || mongoose.model("Todo", Todo);
