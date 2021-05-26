import { DataBase } from '../../database/DataBase'
import { Comment } from '../posts/Comment'
import { Token } from './Token'
import config from 'config'
import cookie from "cookie"
import Users from '../../models/userModel';
import bcrypt from 'bcryptjs'


const KEY = config.get("secretJWT")

export class User {
    constructor( userData, res, req ){
        this.userData = userData
        this.dataBase = new DataBase
        this.secretJWT = KEY
        this.comment = new Comment
        this.res = res
        this.req = req
    }
    
    signJWT(userData, KEY){
        let JWT = new Token(userData, KEY)
        return JWT = JWT.signJWT()
    }
    async login(res = this.res, req = this.req){
        this.dataBase.db_connect()
        try {
            let condidate = await Users.findOne({nickname: this.userData.nickanmeOrLogin}) //поиск по нику
            
            if (!condidate){
                condidate = await Users.findOne({email: this.userData.nickanmeOrLogin}) //поиск по мейлу
                if(!condidate){
                    return res.status(400).json({message:"Такого пользвователя не существует!"})
                }
            }
            const isMatch = await bcrypt.compare(this.userData.password , condidate.password)//сравнение введенного пользователем пароля с имеющимся в бд 
            
            if (!isMatch){
                return res.status(400).json({message:"Был введен неверный пароль!"})
            }

            let role = "user"
            
            if (this.userData.nickanmeOrLogin == "admin" && this.userData.password == "adminadmin"){
                role = "admin"
            }
            const token = this.signJWT({id:condidate._id, nickname:condidate.nickname, email:condidate.email, password:this.userData.password}, this.secretJWT)
            return (
                res.status(201)
                .setHeader("Set-Cookie", cookie.serialize("token",token, {
                    httpOnly: true, 
                    secure: process.env.NODE_ENV !== "development",
                    sameSite:"strict",
                    path:"/"
                    // maxAge: 60*60,
                }))
                .json({ message:"Пользователь удачно авторизован!", nickname:condidate.nickname, userId:condidate.id, role:role })
            )
            
        }catch(e){
            return res.status(404).json({message:"Не удалось авторизоваться!"})
        }
    }
    reg(){
        console.log()
    }
    logout(){
        console.log()
    }
}
export class Creator extends User {
    createArticle(){
        console.log("createArticle")
    }
    editArticel(){
        console.log("editArticel")
    }
}