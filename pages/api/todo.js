import Todo from "../../models/todo";
import connectDb from "../../middleware/db";

const handler = (req, res) => {
  switch (req.method) {
    case "GET":
      Todo.find()
        .populate("folder")
        .exec(function(err, todos) {
          if (err) {
            console.log(err);
          } else {
            res.json(todos);
          }
        });
      break;
    case "POST":
      const { folderId, title, notes, date, dueDate, priority } = req.body;
      console.debug(folderId);
      let todo = new Todo({
        folder: { _id: folderId },
        title,
        notes,
        date,
        dueDate,
        priority
      });
      todo.save(function(err) {
        if (err) res.status(400).send(err);
        // saved!
        res.status(200).json({ message: "todo saved successfully" });
      });
      break;
    default:
      res.status(405).end();
      break;
  }
};

export default connectDb(handler);
