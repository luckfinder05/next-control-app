import mongoose from 'mongoose';

// MongoDB keys
// import keys from '../config/db-config';
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {

  if (cached.conn) { return cached.conn }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }
  cached.conn = await cached.promise;
  return cached.conn
}

export default dbConnect

/*  
const dbConnect = handler => async (req, res) => {
  try {
    if (mongoose.connections[0].readyState) {
      // Use current db connection
      console.log('===========================================Use current db connection: ======================================');
      return handler(req, res);
    }

    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    return handler(req, res);
  } catch (err) {
    console.log(err);
  }
};

export default dbConnect;
 */
