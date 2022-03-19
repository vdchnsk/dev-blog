import validator from 'validator'
import { User } from '../services/auth/User'

export default async function (req, res) {
    if (!req.body) {
        return res.status(404).json({ message: 'Заполните поля авторизации!' })
    }
    const userData = JSON.parse(req.body)

    if (validator.isEmpty(userData.nickanmeOrLogin) == false && validator.isEmpty(userData.password) == false) {
        const user = new User(userData, res, req)

        return user.login()
    }

    return res
        .status(404)
        .json({ message: 'Введены некорректные данные!', errorCausedBy: ['nickanmeOrLogin', 'password'] })
}
