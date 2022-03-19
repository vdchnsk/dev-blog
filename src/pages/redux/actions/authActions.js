import {CHANGE_AUTHON_LOGIN , CHANGE_AUTHON_LOGOUT} from "../types"

export function changeUserData (nickname, userId, isAuthenticated) {
    return {
        type:CHANGE_AUTHON_LOGIN,
        nickname:nickname,
        userId:userId,
        isAuthenticated:isAuthenticated,
        role:role
    }
}