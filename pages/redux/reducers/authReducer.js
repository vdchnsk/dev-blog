import { CHANGE_AUTHON_LOGIN } from "../types"


const nothing = ()=>{} //just dont ask

const initState = {
    token:null,
    userId:null,
    isAuthenticated:false
}

export const authReducer = (state = initState, action) =>{
    switch(action.type){
        case CHANGE_AUTHON_LOGIN: return {state, token:action.token, userId:action.userId, isAuthenticated:action.isAuthenticated}
        default: return state
    }
} 