import { USER_LOGGED_IN, USER_LOGGED_OUT, LOADING_USER, USER_LOADED } from './actionTypes'
import axios from 'axios'
import { setMessage } from './message'
import { editMode } from './posts'

const authBaseURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty'
const API_KEY = 'AIzaSyBc1pZTctdos_bEjeC06XRPxDlFNMEG2Qs'

export const userLogged = user => {
    return {
        type: USER_LOGGED_IN,
        payload: user
    }
}

export const logout = () => {
    return {
        type: USER_LOGGED_OUT
    }
}

export const createUser = (user) => {
    return dispatch => {
        dispatch(loadingUser())
        axios.post(`${authBaseURL}/signupNewUser?key=${API_KEY}`, {
            email: user.email,
            password: user.password,
            returnSecureToken: true,
        })
        .catch(err => {
            console.log(err)
            dispatch(setMessage({
                title: 'Erro',
                text: 'Ocorreu um erro inesperado!'
            }))
        })
        .then(res => {
            if(res.data.localId){
                axios.put(`/users/${res.data.localId}.json`, {
                    name: user.name
                })
                    .catch(err => console.log(err))
                    .then(res => {
                        dispatch(login(user))
                        dispatch(setMessage({
                            title: 'Sucesso',
                            text: 'Usuário criado com sucesso!'
                        }))
                        
                    })
            }
        })
    }
}

export const loadingUser = () => {
    return {
        type: LOADING_USER
    }
}
export const userLoaded = () => {
    return {
        type: USER_LOADED
    }
}
export const login = user => {
    return dispatch => {
        dispatch(loadingUser())
        axios.post(`${authBaseURL}/verifyPassword?key=${API_KEY}`, {
            email: user.email,
            password: user.password,
            returnSecureToken: true
        })
        .catch(err => {
            console.log(err)
            dispatch(setMessage({
                title: 'Erro',
                text: 'Ocorreu um erro inesperado!'
            }))
        })
        .then(res => {
            console.log(res)
            if(res.data.localId){
                user.token = res.data.idToken
                axios.get(`/users/${res.data.localId}.json`)
                .catch(err => {
                    console.log(err)
                    dispatch(setMessage({
                        title: 'Erro',
                        text: 'Ocorreu um erro inesperado!'
                    }))
                })
                .then(resp => {
                    console.log('resp: ', resp)
                    delete user.password
                    user.id = res.data.localId
                    user.name = resp.data.name
                    dispatch(userLogged(user))
                    dispatch(editMode(true))
                    dispatch(userLoaded())
                })
            }
        })
    }
}
