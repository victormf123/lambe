import { SET_POSTS, ADD_COMMENT, CREATING_POST, POST_CREATED, IS_EDIT_MODE, ISNT_EDIT_MODE } from '../actions/actionTypes'


const initialState = {
    posts: [],
    isUploading: false,
    isEditMode: false,
}

const reducer = (state = initialState, action) => {
    
    switch(action.type) {
        case IS_EDIT_MODE:
            return {
                ...state,
                isEditMode: true
            }
        case ISNT_EDIT_MODE:
            return {
                ...state,
                isEditMode: true
            }
        case CREATING_POST:
            return {
                ...state,
                isUploading: true
            }
        case POST_CREATED:
            return {
                ...state,
                isUploading: false,
            }

        case SET_POSTS:
                return {
                    ...state,
                    posts: action.payload
                }
        case ADD_COMMENT:
                return {
                    ...state,
                    posts: state.posts.map(post => {
                        if(post.id === action.payload.postId){
                            if(post.comments){
                                post.comments = post.comments.concat(
                                    action.payload.comment
                                )
                            }else {
                            post.comments = [action.payload.comment]
                            }
                        }
                        return post
                    })
                }
        default:
                return state
    }
}

export default reducer