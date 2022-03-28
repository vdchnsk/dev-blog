import { CHANGE_AUTHON_LOGIN } from '../types'

const initState = {
    nickname: null,
    userId: null,
    userRole: null,
    isAuthenticated: false,
}

export const authReducer = (state = initState, action) => {
    switch (action.type) {
        case CHANGE_AUTHON_LOGIN:
            return {
                ...state,
                nickname: action.nickname,
                userId: action.userId,
                isAuthenticated: action.isAuthenticated,
            }
        default:
            return state
    }
}
