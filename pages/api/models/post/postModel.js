import {Schema , model, models} from "mongoose"

//схема объектов коллекции

const schema = new Schema({
    title:{
        type:String,
        required:true,
        unique:true,  //unique:true,поскольку почта не может повторяться
    },
    bodyPreview:{
        type:String,
        required:true, 
    },
    liked:{
        type:Number,
        requiered:false
    },
    watched:{
        type:Number,
        requiered:false
    },
    date:{
        type:Date,
        default:Date.now
    },
    preview:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    tags:{
        type:Array,
        required:true
    },
    comments:{
        type:Array,
        required:false
    },
})

//Монго создает коллекцию с имением из первого вргумента,дабвляет к окончанию "s"(в данном случае не добавляет тк я третим аргументом указал название коллекции).К примеру ,если изменить "User" на любое другое название,то при подклбчении к бд,автоматически создастся новая коллекция с соответсвующем названием во множественном числе * странно как-то
module.exports = models.Post || model("Post", schema) //Если модель уже создана, то импопртируем готовую , иначе - создаем новую модель.Не до конца понимаю , как именно это работает, но потратил я на это решении часа 4 своей жизни...