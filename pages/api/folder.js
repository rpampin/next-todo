import Folder from "../../models/folder";
import connectDb from "../../middleware/db";

const handler = async (req, res) => {
  switch (req.method) {
    case "GET":
      try {
        let folder = req.query.id
          ? await Folder.findById(req.query.id)
          : await Folder.find();
        res.status(200).json(folder);
      } catch (err) {
        res.status(500).json({ message: err });
      }
      break;
    case "POST":
      const { name, icon } = req.body;
      let folder = new Folder({
        name,
        icon
      });
      try {
        await folder.save();
        res.status(200).json({ message: "folder saved successfully" });
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
