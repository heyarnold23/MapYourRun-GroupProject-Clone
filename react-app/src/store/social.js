const SET_FRIENDS = "social/SET_FRIENDS"
const SET_PENDING_FRIENDS = "social/SET_PENDING_FRIENDS"

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
        dispatch(setFriends({"friends":data.friends}))
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
        default:
            return state
    }
}
