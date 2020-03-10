import Folder from "../../models/folder";
import connectDb from "../../middleware/db";

const handler = (req, res) => {
  switch (req.method) {
    case "GET":
      Folder.find()
        .populate("todos.todo")
        .exec(function(err, folders) {
          if (err) {
            console.log(err);
          } else {
            console.log(folders);
            res.json(folders);
          }
        });
      break;
    case "POST":
      const { name, icon } = req.body;
      let folder = new Folder({
        name,
        icon
      });
      folder.save(function(err) {
        if (err) res.status(400).send(err);
        res.status(200).json({ message: "folder saved successfully" });
      });
      break;
    default:
      res.status(405).end();
      break;
  }
};

export default connectDb(handler);
