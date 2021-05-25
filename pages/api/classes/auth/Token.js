import jwt from 'jsonwebtoken'

export class Token {
    constructor( userData, KEY){
        this.userData = userData
        this.secretKEY = KEY
    }
    signJWT(){
        const userData = this.userData
        const token = jwt.sign({ nickname:userData.nickname, email:userData.email, id:userData.id, password:userData.password}, this.secretKEY)
        return token
    }
}