import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import validator from 'validator';
import config from 'config'
import Connect_db from '../../../utils/dbConnect'
import cookie from "cookie"
import User from '../models/userModel';
import next from 'next';

Connect_db()
const KEY = config.get("secretJWT")


export default async function (req, res){
    
    if(!req.body){
        return res.status(502).json({message:"Тело запроса отсутсвует!"})
    }

    const { nickname, email, password, userId } = JSON.parse(req.body) //парсим строку в объку тк хук useHttp приводит его к строке

    if(
        !validator.isEmpty( nickname ) &&
        !validator.isEmpty( email ) &&
        !validator.isEmpty( password ) &&
        validator.isEmail( email) &&
        password.length >= 6 
        ){
            try{
                const user = await User.findOne({_id:userId}) //поиск по id

                let condidate = await User.findOne({email:email})
                if (condidate && condidate.email !== user.email){
                    console.log(condidate , user.email)
                    return res.status(502).json({message:"Пользователь с такой почтой уже существует!"})
                }else{
                    condidate = await User.findOne({nickname:nickname})
                    if(condidate && condidate.nickname !== user.nickname ){
                        return res.status(502).json({message:"Пользователь с таким никнеймом уже существует!"})
                    }
                }

                user.email = email
                user.nickname = nickname
                let hashedPassword = await bcrypt.hash(password, 12)
                user.password = hashedPassword
                user.save()
                
                const token = jwt.sign({ nickname:user.nickname, email:user.email, id:userId, password:password}, KEY)

                return (
                    res.status(201)
                    .setHeader("Set-Cookie", cookie.serialize("token",token, {
                        httpOnly: true, 
                        secure: process.env.NODE_ENV !== "development",
                        sameSite:"strict",
                        path:"/"
                        // maxAge: 60*60,
                    }))
                    .json({ message:"Данные были удачно изменены!", newNickname:user.nickname, newEmail:user.email, userId})
                )
                
            }catch(e){
                return res.status(502).json({message:"Не удалось произвести изменения!"})
            }
        } 
    else {
        return res.status(502).json({message:"Введены некорректные данные!"})
    }
}