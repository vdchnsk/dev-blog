import mongoose from 'mongoose'

export class DataBase {
    constructor() {
        this.mongoose = mongoose
    }

    db_connect() {
        const mongoose = this.mongoose
        if (mongoose.connection.readyState >= 1) {
            return null
        }
        return mongoose.connect(process.env.MONGODB_URI, {
            //подключение с помощью клоюча в файле env.local
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        })
    }
}
