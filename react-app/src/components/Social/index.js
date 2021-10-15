import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from "react-redux"
import { getFriends, getPendingFriends, acceptFriend, denyFriend, removeFriend} from '../../store/social';
import './Social.css'
import { FaUserCheck, FaUserMinus } from 'react-icons/fa'

const Social = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state=>state.session.user)
    const justAddedfriends = useSelector(state=>state.social.friends)
    const friends = currentUser.friends
    const moreFriends = currentUser.moreFriends
    const pendingFriends = useSelector(state=>state.social.pending_friends)

    useEffect(()=>{
        if(!currentUser)return
        // dispatch(getFriends(currentUser.id))
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
    dispatch(removeFriend(currentUser.id,friendId))
}

return (
    <div className="outer_wrapper">
        <h1>Friend Requests:</h1>
        <div className="requests_wrapper">
            { pendingFriends && pendingFriends.map(pendingFriend=>{
                return (<div className="requests" key={pendingFriend.id}>
                   <p className="friend_name"><b>{pendingFriend?.username?.split("")[0].toUpperCase() + pendingFriend?.username?.slice(1)}</b> </p>
                    <button onClick = {()=>acceptClick(pendingFriend.id)} className="button_yes"><FaUserCheck /></button>
                    <button onClick = {()=>denyClick(pendingFriend.id)} className="button_no"><FaUserMinus /></button>
                </div>)
            })}
        </div>
        <h1>Friends:</h1>
        <div className="friends_wrapper">
            {friends && friends.map(friend=>{
                return (<div className="friends" key={friend.id}>
                   <p className="friend_name"><b> {friend?.username?.split("")[0].toUpperCase() + friend?.username?.slice(1)} </b></p>
                    <button onClick = {()=>removeFriendClick(friend.id)} className="button_no"><FaUserMinus /></button>
                </div>)
            })}
            {moreFriends && moreFriends.map(friend=>{
                return (<div className="friends" key={friend.id}>
                    <p className="friend_name"><b> {friend?.username?.split("")[0].toUpperCase() + friend?.username?.slice(1)} </b></p>
                    <button onClick = {()=>removeFriendClick(friend.id)} className="button_no"><FaUserMinus /></button>
                </div>)
            })}
            {justAddedfriends && justAddedfriends.map(friend=>{
                return (<div className="friends" key={friend.id}>
                    <p className="friend_name"><b> {friend?.username?.split("")[0].toUpperCase() + friend?.username?.slice(1)} </b></p>
                    <button onClick = {()=>removeFriendClick(friend.id)} className="button_no"><FaUserMinus /></button>
                </div>)
            })}
            </div>
    </div>
)

}

export default Social
