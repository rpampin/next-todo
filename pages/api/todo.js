import Todo from "../../models/todo";
import Folder from "../../models/folder";
import connectDb from "../../middleware/db";

const handler = async (req, res) => {
  switch (req.method) {
    case "GET":
      try {
        let todos = await Todo.find().populate("folder", "_id name");
        res.status(200).json(todos);
      } catch (err) {
        res.status(500).json({ message: err });
      }
      break;
    case "POST":
      const { folderId, title, notes, date, dueDate, priority } = req.body;
      
      let todo = new Todo({
        folder: { _id: folderId },
        title,
        notes,
        date,
        dueDate,
        priority
      });

      try {
        let newTodo = await todo.save();
        let newTodoFolder = await Folder.findById(folderId);
        newTodoFolder.todos.push(newTodo);
        await newTodoFolder.save();
        res.status(200).json({ message: "todo saved successfully" });
      } catch (err) {
        res.status(500).json({ message: err });
      }
      break;
    case "DELETE":
      const { id } = req.query;
      try {
        let removedTodo = await Todo.findByIdAndRemove(id);
        await Folder.findByIdAndUpdate(
          removedTodo.folder,
          { $pull: { todos: id } },
          { safe: true, upsert: true }
        );
        res.status(200).json({ message: "Todo deleted successfully" });
      } catch (err) {
        res.status(500).json({ message: err });
      }
      break;
    default:
      res.status(405);
      break;
  }
};

export default connectDb(handler);
