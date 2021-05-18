import { ADD_ARTICLE } from "../types"


const initState = {
    title:null,
    description:null,
    preview:null,
    body:null,
    tags:null,
}

export const articleAddingReducer = (state = initState, action) =>{
    switch(action.type){
        case ADD_ARTICLE: return {...state, title:action.payload.title, description:action.payload.description, preview:action.payload.preview, body:action.payload.body, tags:action.payload.tags}
        default: return state
    }
} 