import { CHANGE_AUTHON_LOGIN } from '../types'

export function changeUserData(nickname, userId, isAuthenticated) {
    return {
        type: CHANGE_AUTHON_LOGIN,
        nickname: nickname,
        userId: userId,
        isAuthenticated: isAuthenticated,
        role: role,
    }
}
