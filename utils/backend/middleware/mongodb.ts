import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_CLUSTER_NAME = process.env.DB_CLUSTER_NAME;
const DB_NAME = process.env.DB_NAME;

const mongodbUrl = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_CLUSTER_NAME}.rcvcs.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

const connectDB = (handler: any) => async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return handler(req, res);
  }
  // Use new db connection
  await mongoose.connect(mongodbUrl, {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
  });
  return handler(req, res);
};

export default connectDB;
