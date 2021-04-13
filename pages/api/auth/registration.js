import jwt from 'jsonwebtoken'
import validator from 'validator';
import config from 'config'
const bcrypt = require('bcrypt');
import Connect_db from '../../../utils/dbConnect'
import mongoose from 'mongoose';
import User from '../models/userModel';

Connect_db()
const KEY = config.get("secretJWT")


export default function (req, res){
    if(!req.body){
        return res.status(404).json({message:"Ошибка при регристарции"})
    }
    const {nickanme ,email, password, password_repeat} = JSON.parse(req.body) //парсим строку в объку тк хук useHttp приводит его к строке

    if(
        !validator.isEmpty(nickanme ) &&
        !validator.isEmpty(email ) &&
        !validator.isEmpty(password ) &&
        !validator.isEmpty(password_repeat ) &&
        validator.isEmail(email) &&
        password === password_repeat
        ){
            try{
                const hashedPassword = bcrypt.hash(password, 12) //хэщируем пароль
                // console.log("hashedPassword",hashedPassword)

                const token = jwt.sign({ nickanme, email, password }, KEY)

                const user = new User({
                    email:email,
                    nickname:nickanme,
                    password:password
                })
                console.log("user",user)
                user.save()

                return res.status(201).json({message:"Пользьователь создан"})
                
            }catch(e){
                return res.status(404).json({message:"Ошибка при регристарции"})
            }
        } 
    else {
        return res.status(404).json({message:"Ошибка при регристарции"})
    }
}