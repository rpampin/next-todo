import Todo from "../../models/todo";
import connectDb from "../../middleware/db";

const handler = (req, res) => {
  switch (req.method) {
    case "POST":
      const { title, notes, date, dueDate, priority } = req.body;
      let todo = new Todo({
        title,
        notes,
        date,
        dueDate,
        priority
      });
      todo.save(function(err) {
        if (err) res.status(400).send(err);
        // saved!
        res.status(200).json(r);
      });
    default:
      res.status(405).end();
      break;
  }
};

export default connectDb(handler);
