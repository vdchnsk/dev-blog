import config from 'config'
import cookie from 'cookie'
import Users from '../../models/userModel'
import { DataBase } from '../../database/DataBase'
import { Comment } from '../posts/Comment'
import { Token } from './Token'
import { UserCheck } from './UserCheck'
import { Crypter } from '../general/Crypter'

const KEY = config.get('secretJWT')

export class User {
    constructor(userData, res, req) {
        this.userData = userData
        this.dataBase = new DataBase()
        this.comment = new Comment()
        this.userCheck = new UserCheck()
        this.crypter = new Crypter()
        this.res = res
        this.req = req
    }

    signJWT(userData, KEY) {
        const JWT = new Token(userData, KEY)

        return JWT.signJWT()
    }

    async login(res = this.res, req = this.req) {
        this.dataBase.db_connect()

        try {
            if (this.userData.captchaToken !== 'noNeed') {
                const isHuman = await this.userCheck.checkGoogleCaptcha(this.userData.captchaToken)

                if (!isHuman) {
                    return res.status(400).json({ message: 'Вы не прошли проверку' })
                }
            }

            let condidate = await Users.findOne({ nickname: this.userData.nickanmeOrLogin })

            if (!condidate) {
                condidate = await Users.findOne({ email: this.userData.nickanmeOrLogin })

                if (!condidate) {
                    return res.status(400).json({ message: 'Такого пользвователя не существует!' })
                }
            }
            const isMatch = await this.crypter.compare(this.userData.password, condidate.password)

            if (!isMatch) {
                return res.status(400).json({ message: 'Был введен неверный пароль!' })
            }

            let role = 'user'

            if (this.userData.nickanmeOrLogin == 'valerii222' && this.userData.password == 'valerii222') {
                role = 'admin'
            }

            const token = this.signJWT(
                {
                    id: condidate._id,
                    nickname: condidate.nickname,
                    email: condidate.email,
                    password: this.userData.password,
                },
                KEY,
            )

            return res
                .status(201)
                .json({
                    message: 'Пользователь удачно авторизован!',
                    nickname: condidate.nickname,
                    userId: condidate.id,
                    role: role,
                })
                .setHeader(
                    'Set-Cookie',
                    cookie.serialize('token', token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== 'development',
                        sameSite: 'strict',
                        path: '/',
                        // maxAge: 60 * 60,
                    }),
                )
        } catch (error) {
            console.error(`Error: ${error.message}`)

            return res.status(402).json({ message: 'Не удалось авторизоваться!' })
        }
    }

    reg() {
        console.log()
    }

    logout() {
        console.log()
    }
}
export class Creator extends User {
    createArticle() {
        console.log('createArticle')
    }
    editArticel() {
        console.log('editArticel')
    }
}
