import connectDb from "../../middleware/db";
import Todo from "../../models/todo";

const handler = (req, res) => {
  if (req.method === "POST") {
    const { title, notes } = req.body;
    let todo = new Todo({
      title,
      notes
    });
    todo
      .save()
      .then(r => {
        res.status(200).json(r);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  }
};

export default connectDb(handler);
