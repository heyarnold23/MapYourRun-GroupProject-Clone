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


export const setComments = (newComment) => async dispatch => {
    // const commentBody = JSON.stringify({body: newComment.body, author_id: newComment.author_id, run_id: newComment.run_id})


    const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComment)
    });

    if(response.ok){
        const data = await response.json();
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
          return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
      }

}


const initialState = {}
export default function commentsReducer(state= initialState, action) {
    // const newState = {...state}
    switch (action.type) {
        case GET_COMMENTS:
            return action.payload
        default:
            return state
    }
}
