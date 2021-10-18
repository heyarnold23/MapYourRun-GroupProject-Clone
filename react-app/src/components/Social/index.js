import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from "react-redux"
import { getFriends, getMoreFriends, getPendingFriends, acceptFriend, denyFriend, removeFriend} from '../../store/social';
import './Social.css'
import { FaUserCheck, FaUserMinus } from 'react-icons/fa'

const Social = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state=>state.session.user)
    const friends = useSelector(state=>state.social.friends)
    const moreFriends = useSelector(state=>state.social.more_friends)
    const pendingFriends = useSelector(state=>state.social.pending_friends)

console.log("this is MORE FRIENDS", moreFriends);
console.log("this is FRIENDS", friends);

    useEffect(()=>{
        if(!currentUser)return
        dispatch(getFriends(currentUser.id))
        dispatch(getMoreFriends(currentUser.id))
        dispatch(getPendingFriends(currentUser.id))
    },[])

const acceptClick = (pendingFriendId) => {
    currentUser && dispatch(acceptFriend(currentUser.id,pendingFriendId))
    //need to dispatch, delete pending friends entry, add friends entry
}
const denyClick = (pendingFriendId) => {
    currentUser && dispatch(denyFriend(currentUser.id,pendingFriendId))
    //need to dispatch, delete pending friends entry
}

const removeFriendClick = (friendId) => {
    const map = moreFriends.map(friend => friend.id)

    if (map.includes(friendId)){
        const data = {
            other_id: friendId,
            other_friend_id: currentUser.id
        }
        dispatch(removeFriend(data))
    } else{
        const data = {
            id: currentUser.id,
            friend_id:friendId
        }
        dispatch(removeFriend(data))
    }
}

return (
    <div className="outer_wrapper">
        <h1>Friend Requests</h1>
        <div className="requests_wrapper">
             {!pendingFriends?.length && (<p>Pending friends will appear here</p>)}
            { pendingFriends && pendingFriends.map(pendingFriend=>{
                return (<div className="requests" key={pendingFriend.id}>
                   <p className="friend_name"><b>{pendingFriend?.username?.split("")[0].toUpperCase() + pendingFriend?.username?.slice(1)}</b> </p>
                    <button style = {{cursor:"pointer"}} onClick = {()=>acceptClick(pendingFriend.id)} className="button_yes"><FaUserCheck /></button>
                    <button style = {{cursor:"pointer"}} onClick = {()=>denyClick(pendingFriend.id)} className="button_no"><FaUserMinus /></button>
                </div>)
            })}
            {!pendingFriends && (<h2>Pending friends will appear here</h2>)}
        </div>
        <hr></hr>
        <h1>Friends</h1>
        <div className="friends_wrapper">
        {!friends?.length && (<p>Friends will appear here</p>)}
            {friends && friends.map(friend=>{
                return (<div className="friends" key={friend.id}>
                   <p className="friend_name"><b> {friend?.username?.split("")[0].toUpperCase() + friend?.username?.slice(1)} </b></p>
                    <button style = {{cursor:"pointer"}} onClick = {()=>removeFriendClick(friend.id)} className="button_no"><FaUserMinus /></button>
                </div>)
            })}
            {moreFriends && moreFriends.map(friend=>{
                return (<div className="friends" key={friend.id}>
                    <p className="friend_name"><b> {friend?.username?.split("")[0].toUpperCase() + friend?.username?.slice(1)} </b></p>
                    <button style = {{cursor:"pointer"}} onClick = {()=>removeFriendClick(friend.id)} className="button_no"><FaUserMinus /></button>
                </div>)
            })}
            {/* {justAddedfriends && justAddedfriends.map(friend=>{
                return (<div className="friends" key={friend.id}>
                    <p className="friend_name"><b> {friend?.username?.split("")[0].toUpperCase() + friend?.username?.slice(1)} </b></p>
                    <button onClick = {()=>removeFriendClick(friend.id)} className="button_no"><FaUserMinus /></button>
                </div>)
            })} */}
            </div>
    </div>
)

}

export default Social
