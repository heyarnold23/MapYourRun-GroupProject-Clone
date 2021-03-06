const GET_COMMENTS = 'comments/LOAD'
const ADD_COMMENT = 'comments/addComment'
const UPDATE_COMMENT = "comments/update";
const DELETE_COMMENT = 'comment/DELETE'

const getComments = (commentsObj) => {
    return {
        type: GET_COMMENTS,
        payload: commentsObj
    }
}

const addComment = (newComment) => ({
    type: ADD_COMMENT,
    newComment
})

const update = (comment) => ({
    type: UPDATE_COMMENT,
    comment,
});

const deleteComment = (deletedComment) => {
    return {
        type: DELETE_COMMENT,
        payload: deletedComment
    }
}



export const getCommentsThunk = () => async (dispatch) => {
    const response = await fetch('/api/comments')


    if (response.ok){
        let comments_obj = await response.json();
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
        dispatch(addComment(data));
        return (data);
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
          return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
      }

}


export const editComment = (commentData) => async (dispatch) => {
    const response = await fetch (`/api/comments/edit/${commentData.id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(commentData),
    });
    if(response.ok) {
      const editComment = await response.json();
      dispatch(update(editComment));
      return editComment;
    }
    else{
        console.log("RESPONSE WAS NOT OK");
    }
};


export const deleteCommentThunk = (commentData) => async (dispatch) => {
    const response = await fetch(`/api/comments/delete/${commentData.id}`);
    if(response.ok){
        dispatch(deleteComment(commentData.id))
    }else{
        //error stuff
    }
}

const initialState = {}
export default function commentsReducer(state= initialState, action) {
    let newState = {...state}
    switch (action.type) {
        case GET_COMMENTS:
            console.log("THIS IS ACTION PAYLOAD",action.payload)
            newState = {...state, ...action.payload}
            // return action.payload
            return newState
        case ADD_COMMENT:
            return {
                ...state,
                    [action.newComment.id]: action.newComment,
                    // ...action.newComment,
                };
        case UPDATE_COMMENT: {
            return {
                ...state,
                [action.comment.id]: action.comment,
            };
        }
        case DELETE_COMMENT:
            delete newState[action.payload]
            return newState
        default:
            return state
    }
}
