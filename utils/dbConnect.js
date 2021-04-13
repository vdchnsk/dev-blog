import mongoose from 'mongoose'

async function dbConnect() {
  // check if we have a connection to the database or if it's currently
  // connecting or disconnecting (readyState 1, 2 and 3)
  if (mongoose.connection.readyState >= 1) {
    return
  }
  return mongoose.connect(process.env.MONGODB_URI, { //подключение с помощью клоюча в файле env.local 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
}
// console.log("mongoose.connection.readyState",mongoose.connection.readyState)

export default dbConnect