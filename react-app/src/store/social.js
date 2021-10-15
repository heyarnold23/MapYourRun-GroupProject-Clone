const SET_FRIENDS = "social/SET_FRIENDS"
const SET_PENDING_FRIENDS = "social/SET_PENDING_FRIENDS"
const ADD_REQUEST = 'social/ADD_REQUEST'


export const setFriends = (friends) => {
    return {
        type:SET_FRIENDS,
        payload:friends
    }
}

export const setPendingFriends = (pending_friends) => {
    return {
        type:SET_PENDING_FRIENDS,
        payload:pending_friends
    }
}

export const addRequest = (pendingReq) => ({
    type: ADD_REQUEST,
    pendingReq
})

export const getPendingFriends = (id) => async dispatch => {
    const res = await fetch(`/api/users/${id}/pending_friends`,{
        headers: {
            'Content-Type': 'application/json',
          },
    })

    if(res.ok){
        const data = await res.json();
        dispatch(setPendingFriends(data))
        return null;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
          return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
      }
}



export const getFriends = (id) => async dispatch => {
    const res = await fetch(`/api/users/${id}/friends`,{
        headers: {
            'Content-Type': 'application/json',
          },
    })

    if(res.ok){
        const data = await res.json();
        dispatch(setFriends(data))
        return null;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
          return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
      }
}

export const setRequest = (pendingReq) => async dispatch => {
    // const commentBody = JSON.stringify({body: pendingReq.body, author_id: pendingReq.author_id, run_id: pendingReq.run_id})
    const response = await fetch(`/api/users/${pendingReq.id}/pending_friends`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pendingReq)
    });

    if(response.ok){
        const data = await response.json();
        dispatch(addRequest(data));
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

export const acceptFriend = (id,requester_id) => async dispatch => {
    const res = await fetch(`/api/users/${id}/friends/accept`,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
          },
        body:JSON.stringify({requester_id:requester_id})
    })

    if(res.ok){
        const data = await res.json();
        dispatch(setFriends({"friends":data.friends}))
        dispatch(setPendingFriends({"pending_friends":data.pending_friends}))
        return null;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
          return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
      }
}

export const denyFriend = (id,requester_id) => async dispatch => {
    const res = await fetch(`/api/users/${id}/friends/deny`,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
          },
        body:JSON.stringify({requester_id:requester_id})
    })

    if(res.ok){
        const data = await res.json();

        dispatch(setPendingFriends({"pending_friends":data.pending_friends}))
        return null;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
          return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
      }
}
export const removeFriend = (id,friendId) => async dispatch => {
    const res = await fetch(`/api/users/${id}/friends`,{
        method:"DELETE",
        headers: {
            'Content-Type': 'application/json',
          },
        body:JSON.stringify({friend_id:friendId})
    })
    if(res.ok){
        const data = await res.json();
        let newFriends = []
        for(let friend of data.friends){
            if(Number(friend['id'])!==Number(friendId)){
                newFriends.push(friend)
            }
        }
        dispatch(setFriends({"friends":newFriends}))
        return null;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
          return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
      }
}

const initialState = {}
export default function socialReducer(state= initialState, action) {
    let newState = {...state}
    console.log("PAYLOAD: " , action.payload)
    switch (action.type) {
        case SET_FRIENDS:
            newState = {...state,...action.payload}
            return newState
        case SET_PENDING_FRIENDS:
            newState = {...state,...action.payload}
            return newState
        case ADD_REQUEST:
            return {
                ...state,
                    [action.pendingReq.id]: action.pendingReq,
                    // ...action.newComment,
                };
        default:
            return state
    }
}
