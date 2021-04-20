import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import validator from 'validator';
import config from 'config'
import Connect_db from '../../../utils/dbConnect'
import User from '../models/userModel';

Connect_db()
const KEY = config.get("secretJWT")


export default async function (req, res){
    
    if(!req.body){
        return res.status(404).json({message:"Заполните поля рагистрации!"})
    }
    const {nickanme ,email, password, password_repeat} = JSON.parse(req.body) //парсим строку в объку тк хук useHttp приводит его к строке

    if(
        !validator.isEmpty( nickanme ) &&
        !validator.isEmpty( email ) &&
        !validator.isEmpty( password ) &&
        !validator.isEmpty( password_repeat ) &&
        validator.isEmail( email) &&
        password === password_repeat &&
        password.length >= 6  
        ){
            try{
                //Поиск уже существующешго аккаунта с тамим ником и почтой
                const user = await User.findOne({email, nickanme}).exec()

                if (!user){
                    return res.status(400).json({message:"Такого пользвователя не существует!"})
                }

                const isMatch = await bcrypt.compare(password , user.password)//сравнение введенного пользователем пароля с имеющимся в бд 

                if (!isMatch){
                    return res.status(400).json({message:"Был введен неверный пароль!"})
                }

                // const hashedPassword = await bcrypt.hashSync(password, bcrypt.genSaltSync(12)); //хэщируем пароль

                const token = await jwt.sign({ nickanme, email, password }, KEY)
                
                return res.status(201).json({message:"Пользователь удачно авторизован!", token:token, userId:user.id})
                
            }catch(e){
                return res.status(404).json({message:"Не удалось создать нового пользователя!"})
            }
        } 
    else {
        return res.status(404).json({message:"Введены некорректные данные!"})
    }
}