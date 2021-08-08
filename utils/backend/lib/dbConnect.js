import mongoose from 'mongoose';

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_CLUSTER_NAME = process.env.DB_CLUSTER_NAME;
const DB_NAME = process.env.DB_NAME;

const MONGODB_URI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_CLUSTER_NAME}.rcvcs.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

if (!DB_USERNAME || !DB_PASSWORD || !DB_CLUSTER_NAME || !DB_NAME) {
  throw new Error(
    'Please set the following environment variables: ' +
      'DB_USERNAME, DB_PASSWORD, DB_CLUSTER_NAME, DB_NAME',
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      bufferMaxEntries: 0,
      useFindAndModify: false,
      useCreateIndex: true,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
