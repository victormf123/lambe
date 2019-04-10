import { CREATING_POST, POST_CREATED, SET_POSTS, IS_EDIT_MODE, ISNT_EDIT_MODE } from './actionTypes'
import { setMessage } from './message'
import axios from 'axios'

export const addPost =  post => {
    return (dispatch, getState) => {
        dispatch(creatingPost())
        axios({
            url: 'uploadImage',
            baseURL: 'https://us-central1-lambe-96998.cloudfunctions.net',
            method: 'post',
            data: {
                image: post.image.base64
            }
        })
            .catch(err => {
                console.log(err)
                dispatch(setMessage({
                    title: 'Erro',
                    text: 'Ocorreu um erro inesperado!'
                }))
            })
            .then(resp => {
                console.log(resp)
                post.image = resp.data.imageUrl
                console.log(post)
                axios.post(`./posts.json?auth=${getState().user.token}`, {...post})
                    .then((res) => {
                        dispatch(fetchPosts())
                        dispatch(postCreated())
                        dispatch(setMessage({
                            title: 'Sucesso',
                            text: 'Nova postagem!'
                        }))
                    })    
                    .catch(err => {
                        console.log(err)
                        dispatch(setMessage({
                            title: 'Erro',
                            text: err
                        }))
                    })
                    
            })

        
    }
    // return {
    
    // }
}

export const editMode = bool => {
    if (bool){
        return {
            type: IS_EDIT_MODE,
            payload: bool
        }
    }else {
        return {
            type: ISNT_EDIT_MODE,
            payload: bool
        }
    }
}

export const isntEditMode = bool => {
    return {
        type: ADD_POST,
        payload: bool
    }
}

export const addComment = payload => {
    return (dispatch, getState) => {
        axios.get(`/posts/${payload.postId}.json`)
        .catch(err => console.log(err))
        .then(res => {
            const comments = res.data.comments || []
            comments.push(payload.comment)
            axios.patch(`/posts/${payload.postId}.json?auth=${getState().user.token}`, { comments })
            .catch(err => {
                console.log(err)
                dispatch(setMessage({
                    title: 'Erro',
                    text: 'Ocorreu um erro inesperado!'
                }))
            })
            .then(res => {
                dispatch(fetchPosts())
            })
        })
    }
    // return {
    //     type: ADD_COMMENT,
    //     payload: comment
    // }
}

export const setPosts = posts => {
    return {
        type: SET_POSTS,
        payload: posts
    }
}

export const fetchPosts = () => {
    return dispatch => {
        axios.get('/posts.json')
            .catch(err => {
                console.log(err)
                dispatch(setMessage({
                    title: 'Erro',
                    text: 'Ocorreu um erro inesperado!'
                }))
            })
            .then(res => {
                console.log(res)
                const rawPosts = res.data
                const posts = []
                for (let key in rawPosts){
                    posts.push({
                        ...rawPosts[key],
                        id: key 
                    })
                }
                dispatch(setPosts(posts.reverse()))
            })
    }
}

export const creatingPost = () => {
    return {
        type: CREATING_POST
    }
}

export const postCreated = () => {
    return {
        type: POST_CREATED
    }
}