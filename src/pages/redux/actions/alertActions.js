import { SHOW_ALERT, HIDE_ALERT } from '../types'

export function showAlert(text, type) {
    return {
        type: SHOW_ALERT,
        payload: {
            text: text,
            type: type,
        },
    }
}
export function hideAlert() {
    return {
        type: HIDE_ALERT,
    }
}
