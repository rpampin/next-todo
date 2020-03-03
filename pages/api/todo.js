import Error from "next/error";

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
      todo
        .save()
        .then(r => {
          res.status(200).json(r);
        })
        .catch(err => {
          res.status(400).send(err);
        });
    default:
      res.status(400).send("404: Not Found");
  }
};

export default connectDb(handler);
