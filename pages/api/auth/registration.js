import jwt from 'jsonwebtoken'

const KEY = "secret"

export default function(req, res){
    if(!req.body){
        res.statusCode = 404
        res.end("Error")
        return
    }
    const {nickanme ,email, password, password_repeat} = req.body

    res.json({
        token:jwt.sign({
            nickanme , email , password
        },KEY)
    })
}