import validator from 'validator';
import { User } from '../classes/auth/User';


export default async function (req, res){
    if(!req.body){
        return res.status(404).json({message:"Заполните поля авторизации!"})
    }
    const userData = JSON.parse(req.body) //парсим строку в объку тк хук useHttp приводит его к строке

    if(
        !validator.isEmpty( userData.nickanmeOrLogin ) &&
        !validator.isEmpty( userData.password )
        ){  
            const user = new User(userData, res, req)
            return user.login()
        } 
    else {
        return res.status(404).json({message:"Введены некорректные данные!", errorCausedBy:["nickanmeOrLogin","password"]})
    }
}