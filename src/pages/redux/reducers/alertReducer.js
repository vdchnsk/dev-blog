import { SHOW_ALERT, HIDE_ALERT} from "../types"


const initState = {
    text:"",
    type:"warning",
}

export const alertReducer = (state = initState, action) =>{
    switch(action.type){
        case SHOW_ALERT: return {...state, text:action.payload.text, type:action.payload.type}
        case HIDE_ALERT: return {...state, text:""}
        default: return state
    }
} 