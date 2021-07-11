import { ADD_ARTICLE } from "../types"

export function addArticleInfo (title, description, preview, body, tags) {
    return {
        type:ADD_ARTICLE,
        payload:{title:title,description:description, preview:preview, body:body, tags:tags},
    }
}