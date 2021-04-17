import {CHANGE_AUTHON_LOGIN , CHANGE_AUTHON_LOGOUT} from "../types"

export function changeAuthStatusLogin (token, userId, isAuthenticated) {
    return {
        type:CHANGE_AUTHON_LOGIN,
        token:token,
        userId:userId,
        isAuthenticated:isAuthenticated
    }
}
// export function changeAuthStatusLogout(token, userId){
//     return {
//         type:CHANGE_AUTHON_LOGOUT,
//         token:token,
//         userId:userId
//     }
// }