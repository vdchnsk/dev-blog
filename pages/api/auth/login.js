import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import validator from 'validator';
import config from 'config'
import Connect_db from '../../../utils/dbConnect'
import cookie from "cookie"
import User from '../models/userModel';

Connect_db()
const KEY = config.get("secretJWT")

export default async function (req, res){
    if(!req.body){
        return res.status(404).json({message:"Заполните поля авторизации!"})
    }
    const { nickanmeOrLogin, password } = JSON.parse(req.body) //парсим строку в объку тк хук useHttp приводит его к строке

    if(
        !validator.isEmpty( nickanmeOrLogin ) &&
        !validator.isEmpty( password )
        ){  
            try{
                let user = await User.findOne({nickname: nickanmeOrLogin}) //поиск по нику

                if (!user){
                    user = await User.findOne({email: nickanmeOrLogin}) //поиск по мейлу
                    if(!user){
                        return res.status(400).json({message:"Такого пользвователя не существует!"})
                    }
                }
                const isMatch = await bcrypt.compare(password , user.password)//сравнение введенного пользователем пароля с имеющимся в бд 
                
                if (!isMatch){
                    return res.status(400).json({message:"Был введен неверный пароль!"})
                }
                // создание дефолтной роли "user"

                let role = "user"
                // const hashedPassword = await bcrypt.hashSync(password, bcrypt.genSaltSync(12)); //хэщируем пароль
                
                if (nickanmeOrLogin == "admin" && password == "adminadmin"){
                    role = "admin"
                }
                
                const token = jwt.sign({ nickname:user.nickname, email:user.email, id:user.id, password:password}, KEY)
                
                return (
                    res.status(201)
                    .setHeader("Set-Cookie", cookie.serialize("token",token, {
                        httpOnly: true, 
                        secure: process.env.NODE_ENV !== "development",
                        sameSite:"strict",
                        path:"/"
                        // maxAge: 60*60,
                    }))
                    .json({ message:"Пользователь удачно авторизован!", nickname:user.nickname, userId:user.id, role:role })
                )
                
            }catch(e){
                return res.status(404).json({message:"Не удалось авторизоваться!"})
            }
        } 
    else {
        return res.status(404).json({message:"Введены некорректные данные!"})
    }
}