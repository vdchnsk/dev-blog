const express = require('express')
const config = require("config")
const mongoose = require("mongoose")

const app = express()
const PORT = config.get('port') || 5000

app.use(express.json({ extended:true }))


async function start(){
    try{
        await mongoose.connect(config.get('mongoUrl'),{ //пожключение к бд ,с помощью ссылки из конфига
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true,
            useFindAndModify:true
        })

        app.listen(PORT , () => {
            console.log('\x1b[34m',`'backend app started on port ${PORT}'` )
        })
    } catch (e) {
        console.log(e)
    }
}

start()
















// const next = require('next')

// const dev = process.env.NODE_ENV !== 'production'
// const app = next({dev})
// const handle = app.getRequestHandler()


// app.prepare().then(() => {
//     const server = express()
//     server.use(express.json({ extended:true }))

//     const PORT = config.get('port') || 5000

//     server.get('*' , (req, res) => {
//         return handle(req, res)
//     })

//     server.listen(PORT , (err) => {
//         if(err){
//             throw err
//         }
//         console.log('\x1b[34m',`'backend app started on port ${PORT}'` )
//     })
// }).catch((ex)=>{
//     console.error(ex.stack)
//     process.exit(1)
// })