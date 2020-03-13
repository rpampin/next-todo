import Todo from "../../models/todo";
import Folder from "../../models/folder";
import connectDb from "../../middleware/db";

const handler = async (req, res) => {
  switch (req.method) {
    case "GET":
      try {
        let todos = req.query.id
          ? await Todo.findById(req.query.id)
          : await Todo.find().populate("folder", "_id name");
        res.status(200).json(todos);
      } catch (err) {
        res.status(500).json({ message: err });
      }
      break;
    case "POST":
      const { _id, folder, title, notes, date, dueDate, priority } = req.body;

      let todo = new Todo({
        _id: _id,
        folder: { _id: folder },
        title,
        notes,
        date,
        dueDate,
        priority
      });

      try {
        let newTodo = _id
          ? await Todo.findByIdAndUpdate(_id, todo)
          : await todo.save();
        await Folder.findOneAndUpdate(
          { _id: folder, todos: { $nin: newTodo._id } },
          {
            $push: {
              todos: newTodo._id
            }
          }
        );
        res.status(200).json({ message: "todo saved successfully" });
      } catch (err) {
        console.log(err);
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
