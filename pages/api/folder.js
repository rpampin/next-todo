import Folder from "../../models/folder";
import connectDb from "../../middleware/db";

const handler = (req, res) => {
  switch (req.method) {
    case "POST":
      const { name, icon } = req.body;
      let folder = new Folder({
        name,
        icon
      });
      folder.save(function(err) {
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
