import mongoose from "mongoose";

const connectDb = handler => async (req, res) => {
  if (mongoose.connections[0].readyState) return handler(req, res);
  // Using new database connection
  await mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true
  });
  return handler(req, res);
};

export default connectDb;
