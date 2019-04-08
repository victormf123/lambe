import { SET_POSTS, ADD_COMMENT, CREATING_POST, POST_CREATED } from '../actions/actionTypes'


const initialState = {
    posts: [],
    isUploading: false,
    // posts: [{
    //     id: Math.random(),
    //     neckname: 'Rafael Paereira Filho',
    //     email: 'rafaelprrflh@gmail.com',
    //     image: require('../../../assets/imgs/fence.jpg'),
    //     comments: [{
    //         nickname: 'John Ray Sheldon',
    //         comment: 'Stunning!'
    //     },{
    //         nickname: 'Ana Julia Arruda',
    //         comment: 'Foto linda! Onde foi tirada?'
    //     }]
    // },{
    //     id: Math.random(),
    //     neckname: 'Francisco Leandro Lima',
    //     email: 'fllima@gmail.com',
    //     image: require('../../../assets/imgs/bw.jpg'),
    //     comments: []
    // }]
}

const reducer = (state = initialState, action) => {
    
    switch(action.type) {
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