import { SET_MESSAGE } from './actionTypes'

export const setMessage = message => {
    console.log('Messagem: ', message)
    return {
        type: SET_MESSAGE,
         payload: message
    }
}