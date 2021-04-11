import jwt from 'jsonwebtoken'
import validator from 'validator';
import config from 'config'
import {Connect_db} from './connect'

const KEY = config.get("secretJWT")
Connect_db()


export default function(req, res){
    if(!req.body){
        res.statusCode = 404
        res.end("Error")
        return
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
        res.json({
            token:jwt.sign({
                nickanme , email , password
            },KEY)
        })
    } else {
        res.statusCode = 404
        res.end("Error")
        return
    }
}