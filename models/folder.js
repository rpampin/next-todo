const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Folder = new Schema({
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String
  },
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo"
    }
  ]
});

export default mongoose.models.Folder || mongoose.model("Folder", Todo);
