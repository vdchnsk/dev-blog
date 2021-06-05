import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import validator from 'validator';
import config from 'config'
import Connect_db from '../../../utils/dbConnect'
import cookie from "cookie"
import User from '../models/userModel';
import { Crypter } from "../classes/general/Crypter";

Connect_db()
const KEY = config.get("secretJWT")


export default async function (req, res){
    if(!req.body){
        return res.status(402).json({message:"Заполните поля рагистрации!"})
    }
    const {nickname ,email, password, password_repeat} = JSON.parse(req.body) //парсим строку в объку тк хук useHttp приводит его к строке

    if(
        !validator.isEmpty( nickname ) &&
        !validator.isEmpty( email ) &&
        !validator.isEmpty( password ) &&
        !validator.isEmpty( password_repeat ) &&
        validator.isEmail( email) &&
        password === password_repeat &&
        password.length >= 6  
        ){
            try{
                //Поиск уже существующешго аккаунта с тамим ником и почтой
                const crypter = new Crypter()
                const condidate = await User.findOne({email}).exec()
                
                if (condidate){ 
                    return res.status(400).json({message:"Такой пользователь уже сущестует!"})
                }

                // const hashedPassword = await bcrypt.hashSync(password, bcrypt.genSaltSync(12)); //хэщируем пароль
                const hashedPassword = await crypter.encrypt(password)

                const user = await new User({
                    email:email,
                    nickname:nickname,
                    password:hashedPassword
                })
                await user.save()
                
                
                const userId = user.id
                
                const token = jwt.sign({ nickname:nickname, email:email, id:userId, password:password }, KEY)

                return (
                    res.status(201)
                    .setHeader("Set-Cookie", cookie.serialize("token",token, {
                        httpOnly: true, 
                        secure: process.env.NODE_ENV !== "development",
                        sameSite:"strict",
                        path:"/"
                        // maxAge: 60*60,
                    }))
                    .json({message:"Пользьователь создан!", nickname:nickname, userId:userId, role:"user"}))
                
            }catch(e){
                return res.status(402).json({message:"Не удалось создать нового пользователя!"})
            }
        } 
    else {
        return res.status(402).json({message:"Введены некорректные данные!"})
    }
}