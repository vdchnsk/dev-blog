import { combineReducers } from "redux";
import { alertReducer } from './reducers/alertReducer'

//ГЛОБАЛЬНЫЙ REDUCER
export const rootReducer = combineReducers({
    alerts:alertReducer,
})