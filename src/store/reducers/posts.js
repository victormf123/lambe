import { ADD_POST } from '../actions/actionTypes'

const initialState = {
    posts: [{
        id: Math.random(),
        neckname: 'Rafael Paereira Filho',
        email: 'rafaelprrflh@gmail.com',
        image: require('../../../assets/imgs/fence.jpg'),
        comments: [{
            nickname: 'John Ray Sheldon',
            comment: 'Stunning!'
        },{
            nickname: 'Ana Julia Arruda',
            comment: 'Foto linda! Onde foi tirada?'
        }]
    },{
        id: Math.random(),
        neckname: 'Francisco Leandro Lima',
        email: 'fllima@gmail.com',
        image: require('../../../assets/imgs/bw.jpg'),
        comments: []
    }]
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_POST:
                return {
                    ...state,
                    posts: state.posts.concat({
                        ...action.payload
                    })
                }
        default:
                return state
    }
}

export default reducer