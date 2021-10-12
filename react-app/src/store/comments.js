const GET_COMMENTS = 'comments/LOAD'

const getComments = (commentsObj) => {
    return {
        type: GET_COMMENTS,
        payload: commentsObj
    }
}

export const getCommentsThunk = () => async (dispatch) => {
    const response = await fetch('/api/comments')

    let comments_obj = await response.json();

    if (response.ok){
        dispatch(getComments(comments_obj))
    }
}


const initialState = {}
export default function commentsReducer(state= initialState, action) {
    const newState = {...state}
    switch (action.type) {
        case GET_COMMENTS:
            return action.payload
        default:
            return state
    }
}