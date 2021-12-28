import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getRunsThunk } from '../../store/runs'
import './ActivityFeed.css'
import CommentsFeed from '../Comments';
import { FaRegComments } from 'react-icons/fa'
import { getCommentsThunk, setComments } from '../../store/comments';
import { getFriends, getSentPendingRequests, getPendingFriends, getMoreFriends, setRequest } from '../../store/social';
import { FaUserPlus } from 'react-icons/fa'
import { RiUserFollowFill } from 'react-icons/ri'
import { RiUserShared2Fill } from 'react-icons/ri'
import { RiUserReceived2Fill } from 'react-icons/ri'


export default function ActivityFeed() {
  const sessionUser = useSelector(state => state.session.user);
  const runs = useSelector(store => store?.runs)
  // const commentsObject = useSelector(state => state?.comments)
  const friendsArr = useSelector(state => state.social.friends)
  const moreFriendsArr = useSelector(state => state.social.more_friends)
  const pendingFriendsArr = useSelector(state => state.social.pending_friends)
  const sentPendingFriends = useSelector(state => state.social.sent_pending_friends)

  const dispatch = useDispatch()

  const [showMenu, setShowMenu] = useState(false);
  const [shifter, setShifter] = useState(false);
  const [drop, setDrop] = useState(false);
  const [body, setBody] = useState('');
  const [cardId, setCardId] = useState();
  const [commentTest, setCommentTest] = useState(false);

  const runsArr = Object.values(runs)

  let friendsIdArr
  let friendsRuns;
  let moreFriendsIdArr;
  let moreFriendsRuns;
  let pendingFriendsIdArr;
  let sentPendingFriendsIdArr;
  let sentPendingFriendsObj;
  let ultimateFriends;

  if (sessionUser) {
    friendsIdArr = friendsArr?.map(friend => friend.id);
    moreFriendsIdArr = moreFriendsArr?.map(friend => friend.id);
    pendingFriendsIdArr = pendingFriendsArr?.map(friend => friend.id);
    try {
      sentPendingFriendsIdArr = sentPendingFriends?.map(friend => friend.id)
    } catch (error) {
      sentPendingFriendsObj = Object.values(sentPendingFriends)
      sentPendingFriendsIdArr = sentPendingFriendsObj?.map(friend => friend.id)
      console.log("THIS IS OBJECT VALUES SIDE", sentPendingFriendsIdArr);
    }

    friendsRuns = runsArr.filter(run => friendsIdArr?.includes(run.runner_id))
    moreFriendsRuns = runsArr.filter(run => moreFriendsIdArr?.includes(run.runner_id))
    ultimateFriends = [...friendsRuns, ...moreFriendsRuns]
  }

  const openMenu = (id) => {
    if (showMenu) return;
    setCardId(id)
    setShowMenu(true);
  };

  const closeMenu = (e) => {
    e.preventDefault()
    setShowMenu(false)
  }

  const seeFriends = (id) => {
    // console.log('this is inside openMenu', id);
    if (shifter) return;
    // setCardId(id)
    setShifter(true);
    setDrop(false)
  };

  const seeExplore = (e) => {
    e.preventDefault()
    setShifter(false)
    setDrop(false)
  }

  const openDrop = (id) => {
    // console.log('this is inside openMenu', id);
    if (drop) return;
    // setCardId(id)
    setDrop(true);
  };

  // const seeExplore = (e) => {
  //   e.preventDefault()
  //   setShifter(false)
  // }

  const reset = () => {
    setBody('');
  };

  const handleSubmit = async (e, id) => {
    console.log('inside handleSubmit', id);
    e.preventDefault();

    if (commentTest) {
      setCommentTest(false)
    }
    else {
      setCommentTest(true)
    }

    const newComment = {
      body,
      author_id: sessionUser.id,
      run_id: id
    };

    console.log('this is bodddyyyyyyyyyy', body);
    console.log('this is id', sessionUser.id);
    dispatch(setComments(newComment));

    reset();
  };

  const sendRequest = async (e, id) => {
    e.preventDefault();

    console.log(sessionUser.id, id);

    const newRequest = {
      // id: sessionUser.id,
      // friend_id: id
      id: id,
      friend_id: sessionUser.id
    };

    dispatch(setRequest(newRequest));

  }

  const checkFriends = (runner_id) => {
    // console.log(runner_id);
    return (friendsIdArr?.includes(runner_id) || moreFriendsIdArr?.includes(runner_id))
  };

  const checkPendingFriends = (runner_id) => {
    // console.log(runner_id);
    return (pendingFriendsIdArr?.includes(runner_id))
  };

  const checkSentFriends = (runner_id) => {
    if (sentPendingFriendsIdArr) {
      return (sentPendingFriendsIdArr?.includes(runner_id))
    }
  };

  useEffect(() => {
    dispatch(getRunsThunk())
    dispatch(getCommentsThunk())
    dispatch(getFriends(sessionUser?.id))
    dispatch(getMoreFriends(sessionUser?.id))
    dispatch(getSentPendingRequests(sessionUser?.id))
    dispatch(getPendingFriends(sessionUser?.id))

    if (!drop) return;
    const closeDrop = () => {
      setDrop(false);
    };
    document.addEventListener('click', closeDrop);
    return () => document.removeEventListener("click", closeDrop);

  }, [dispatch, sessionUser?.id, drop])




  /******** If Friends is clicked, BELOW will render **********/
  if (shifter) {
    return (
      <>
        <div id='middle'>
          <div id='dropdown'>
            <div onClick={openDrop}>
              Friends
            </div>

            {drop && (
            <div className='popOut'>
              <div onClick={seeExplore}>
                Explore
              </div>
            </div>
            )}
          </div>

          {ultimateFriends.length > 0 ? (ultimateFriends.map(friend => {

            return (
              <div key={friend.id} className='cardDiv' id={friend.id}>
                {/* <div id='profilePicDiv'>
                  Picture
                </div> */}
                <div id='mainDetailsDiv'>
                  <div id='nameDiv'>
                    <p id='name'>
                      <span id='nameText'>{friend?.user_name.username}</span> went for a run
                    </p>
                  </div>
                  <div id='screenshot' style={{ backgroundImage: `url(${friend?.image_url})` }}>
                    {/* {(<img src = {friend?.image_url} width="250px" height="100px"></img>)} */}
                  </div>
                  <div id='runDetailsDiv'>
                    <div className='detailDiv'>
                      <div className='inDetailDiv'>
                        {friend.distance.toFixed(1)}
                        {/* {friend.id} */}
                      </div>
                      <div className='descriptionDiv'>
                        Distance(mi)
                      </div>
                    </div>
                    <div className='detailDiv middle'>
                      <div className='inDetailDiv'>
                        {(friend.distance * 102).toFixed(1)}
                      </div>
                      <div className='descriptionDiv'>
                        Calories Burned(kcal)
                      </div>
                    </div>
                    <div className='detailDiv'>
                      <div className='inDetailDiv' style = {{textAlign:"center"}}>
                        {Math.floor(friend?.time / 3600) < 1 ? "" : `${Math.floor(friend?.time / 3600)} hour${Math.floor(friend?.time / 3600) < 2 ? "" : "s"} `}{Math.floor(friend?.time / 3600) < 1 ? `${(((friend?.time / 3600) % 1) * 60).toFixed(0)} minute${Number(((friend?.time / 3600) % 1) * 60).toFixed(0) < 2 ? "" : "s"}` : `${(((friend?.time / 3600) % 1) * 60).toFixed(0)} minutes`}
                      </div>
                      <div className='descriptionDiv'>
                        Duration
                      </div>
                    </div>
                  </div>
                  <div id='lastDiv'>

                    {!showMenu && (
                      <span id='commentsButton' onClick={() => { openMenu(friend?.id) }}>
                        <FaRegComments />
                      </span>
                    )}

                    {showMenu && (
                      <span id='commentsButton' onClick={closeMenu}>
                        <FaRegComments />
                      </span>
                    )}

                  </div>
                  {(showMenu && cardId === friend.id) && (
                    <>
                      <CommentsFeed id={friend.id} />
                      <div className='commentForm'>
                        {/* <div className='formPic'>
                        </div> */}
                        <div className='formField'>
                          <form onSubmit={(event) => handleSubmit(event, friend.id)} className='commentInput'>
                            <textarea
                              rows='1'
                              value={body}
                              className='textAreaInput'
                              maxlength='75'
                              onChange={(e) => setBody(e.target.value)}
                              name="body"
                              placeholder="Add a comment"
                            ></textarea>
                            <div className='formButtonDiv'>
                              <button className='formButton' type="submit">POST</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )
          })): (<div className='getSomeFriendsDiv'>
                  <span className='getSomeFriendsText'>
                    Add some friends to liven up this feed!
                  </span>
                </div>)}
        </div>
      </>
    )
  }
  /******** If Friends is clicked, ABOVE will render **********/



  return (
    <>
      <div id='middle'>
        {sessionUser && (
          <div id='dropdown'>
            {/* <button onClick={seeFriends}>
                  Explore
                </button> */}
            <div onClick={openDrop}>
              Explore
            </div>

            {drop && (
            <div className='popOut'>
              <div onClick={seeFriends}>
                Friends
              </div>
            </div>
            )}
          </div>
        )}
        {Object.keys(runs)?.map((id) => {
          let run = runs[id]
          // let runId = run.id
          // console.log('this is runiddddd',runId);

          return (
            <div key={run.id} className='cardDiv' id={run.id}>
              <div id='mainDetailsDiv'>
                <div id='nameDiv'>
                  <p id='name'>
                    <span id='nameText'>{run?.user_name.username}</span> went for a run
                  </p>
                  {(sessionUser && sessionUser.id !== run.runner_id && checkSentFriends(run.runner_id)) ? (
                    <div className='addFriend'>
                      <span className="sent-friend-and-friend">
                        <RiUserShared2Fill />
                      </span>
                    </div>
                  ) : (sessionUser && sessionUser.id !== run.runner_id && checkPendingFriends(run.runner_id)) ? (
                    <div className='addFriend'>
                      <span className="sent-friend-and-friend">
                        <RiUserReceived2Fill />
                      </span>
                    </div>
                  ) : (sessionUser && sessionUser.id !== run.runner_id && checkFriends(run.runner_id) === false) ? (
                    <div className='addFriend'>
                      {/* <button onClick={sendRequest}> */}
                      <button className="add-friend-button" onClick={(event) => sendRequest(event, run.runner_id)}>
                        <FaUserPlus />
                      </button>
                    </div>
                  ) : (sessionUser && sessionUser.id !== run.runner_id && checkFriends(run.runner_id)) ? (
                    <div className='addFriend'>
                      <span className="sent-friend-and-friend">
                        <RiUserFollowFill />
                      </span>
                    </div>
                  ) : null
                  }
                </div>
                <div id='screenshot' style={{ backgroundImage: `url(${run?.image_url})` }}>
                  {/* {(<img src = {run?.image_url} alt='screenshot' width="250px" height="100px"></img>)} */}
                </div>
                <div id='runDetailsDiv'>
                  <div className='detailDiv'>
                    <div className='inDetailDiv'>
                      {run.distance.toFixed(1)}
                      {run.id}
                    </div>
                    <div className='descriptionDiv'>
                      Distance(mi)
                    </div>
                  </div>
                  <div className='detailDiv middle'>
                    <div className='inDetailDiv'>
                      {(run.distance * 102).toFixed(1)}
                    </div>
                    <div className='descriptionDiv'>
                      Calories Burned(kcal)
                    </div>
                  </div>
                  <div className='detailDiv' >
                    <div className='inDetailDiv' style = {{textAlign:"center"}}>
                      {Math.floor(run?.time / 3600) < 1 ? "" : `${Math.floor(run?.time / 3600)} hour${Math.floor(run?.time / 3600) < 2 ? "" : "s"} `}{Math.floor(run?.time / 3600) < 1 ? `${(((run?.time / 3600) % 1) * 60).toFixed(0)} minute${Number(((run?.time / 3600) % 1) * 60).toFixed(0) < 2 ? "" : "s"}` : `${(((run?.time / 3600) % 1) * 60).toFixed(0)} minutes`}
                    </div>
                    <div className='descriptionDiv'>
                      Duration
                    </div>
                  </div>
                </div>
                <div id='lastDiv'>
                  {/* implement a show button functionality here */}
                  {/* Maybe make a comments component and have it be a child here on show menu */}

                  {!showMenu && (
                    <span id='commentsButton' onClick={() => { openMenu(run?.id) }}>
                      <FaRegComments />
                    </span>
                  )}

                  {showMenu && (
                    <span id='commentsButton' onClick={closeMenu}>
                      <FaRegComments />
                    </span>
                  )}

                  {/* <div id='createdDate'>
                      created
                    </div> */}
                </div>
                {/* If conditional here to show comments feed if CommentButton is clicked */}
                {/* <div id='comments'>
                      {run?.comments?.map(comment => comment.body)}
                  </div> */}
                {(showMenu && cardId === run.id) && (
                  <>
                    <CommentsFeed id={run.id} />
                    {sessionUser && (
                      <div className='commentForm'>
                        {/* <div className='formPic'>
                          Picture
                        </div> */}
                        <div className='formField'>
                          <form onSubmit={(event) => handleSubmit(event, run.id)} className='commentInput'>
                            <textarea
                              rows='1'
                              value={body}
                              className='textAreaInput'
                              onChange={(e) => setBody(e.target.value)}
                              name="body"
                              placeholder="Add a comment"
                            ></textarea>
                            <div className='formButtonDiv'>
                              <button className='formButton' type="submit">POST</button>
                            </div>
                          </form>
                        </div>
                        {/* <div className='formButtonDiv'>
                        <button className='formButton'>
                          Submit
                        </button>
                      </div> */}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </>

  )

}
