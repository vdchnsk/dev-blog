import validator from 'validator'
import { User } from '../services/auth/User'
import { Crypter } from '../services/general/Crypter'
import { DataBase } from '../database/DataBase'
import Users from '../models/userModel'

export default async function (req, res) {
    if (!req.body) {
        return res.status(404).json({ message: 'Данные не были переданы!' })
    }
    const userData = JSON.parse(req.body)
    try {
        const db = await new DataBase()
        const crypter = new Crypter()
        db.db_connect()
        let condidate = await Users.findOne({ email: userData.nickanmeOrLogin }) //поиск по нику
        if (condidate) {
            return res
                .status(202)
                .json({
                    message: 'login',
                    nickanmeOrLogin: condidate.email,
                    password: crypter.decrypt(condidate.password),
                })
        } else {
            return res.status(202).json({ message: 'registration' })
        }
    } catch {
        return res.status(402).json({ message: 'Неизвестная ошибка!' })
    }
}
