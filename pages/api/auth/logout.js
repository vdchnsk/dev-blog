import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from 'config'
import cookie from "cookie"
 
export default async function (req, res){
    return (
        res.status(201)
        .setHeader("Set-Cookie", cookie.serialize("token","", {
            httpOnly: true, 
            secure: process.env.NODE_ENV !== "development",
            sameSite:"strict",
            path:"/",
            expires: new Date(0)
            // maxAge: 60*60,
        }))
        .json({ message:"Вы вышли из учетной записи!"})
    )
}