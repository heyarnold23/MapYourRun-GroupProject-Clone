import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {getRunsThunk} from '../../store/runs'
import './ActivityFeed.css'
import CommentsFeed from '../Comments';
import {FaRegComments} from 'react-icons/fa'
import { getCommentsThunk, setComments } from '../../store/comments';
import EditCommentForm from '../EditCommentForm';
import { setRequest } from '../../store/social';

export default function ActivityFeed() {
  const sessionUser = useSelector(state => state.session.user);
  const runs = useSelector(store => store?.runs)
  const commentsObject = useSelector(state => state?.comments)

  const dispatch = useDispatch()

  const [showMenu, setShowMenu] = useState(false);
  const [shifter, setShifter] = useState(false);
  const [drop, setDrop] = useState(false);
  const [body, setBody] = useState('');
  const [cardId, setCardId] = useState();
  const [commentTest, setCommentTest] = useState(false);

  const runsArr = Object.values(runs)

  let friendsIdArr;
  let friendsRuns;

  if (sessionUser) {
    friendsIdArr = sessionUser.friends.map(friend => friend.id)
    friendsRuns = runsArr.filter(run => friendsIdArr.includes(run.runner_id) )
  }
  // const friendsIdArr = sessionUser.friends.map(friend => friend.id)


  // console.log("this is Runs", runsArr);
  // console.log("this is friendsIdArr", friendsIdArr);
  // console.log("this is friendsRuns", friendsRuns);
  // console.log('this is commentsObject',commentsObject);

  const openMenu = (id) => {
    // console.log('this is inside openMenu', id);
    if (showMenu) return;
    setCardId(id)
    setShowMenu(true);
  };

  const closeMenu = (e) => {
    e.preventDefault()
    setShowMenu(false)
    // setBody(comment.body)
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
      console.log('inside handleSubmit',id);
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

      console.log('this is bodddyyyyyyyyyy',body);
      console.log('this is id',sessionUser.id);
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

  useEffect(() => {
    dispatch(getRunsThunk())
    dispatch(getCommentsThunk())
    return
  },[dispatch])




  /******** If Friends is clicked, BELOW will render **********/
  if (shifter) {
    return (
      <>
        <div id='middle'>
          <div id='dropdown'>
                <button onClick={openDrop}>
                  Friends
                </button>

                {drop && (
                  <button onClick={seeExplore}>
                  Explore
                  </button>
                )}
          </div>

            {friendsRuns.map(friend => {

            return(
              <div key={friend.id} className='cardDiv' id={friend.id}>
                <div id='profilePicDiv'>
                  Picture
                </div>
                <div id='mainDetailsDiv'>
                  <div id='nameDiv'>
                    <p id='name'>
                      {friend?.user_name.username} went for a run
                    </p>
                  </div>
                  <div id='screenshot' style={{ backgroundImage: `url(${friend?.image_url})`}}>
                    {/* {(<img src = {friend?.image_url} width="250px" height="100px"></img>)} */}
                  </div>
                  <div id='runDetailsDiv'>
                    <div className='detailDiv'>
                      <div className='inDetailDiv'>
                        {friend.distance.toFixed(1)}
                        {friend.id}
                      </div>
                      <div className='descriptionDiv'>
                        Distance(mi)
                      </div>
                    </div>
                    <div className='detailDiv middle'>
                      <div className='inDetailDiv'>
                      {(friend.distance*102).toFixed(1)}
                      </div>
                      <div className='descriptionDiv'>
                        Calories Burned(kcal)
                      </div>
                    </div>
                    <div className='detailDiv'>
                      <div className='inDetailDiv'>
                      {Math.floor(friend?.time/3600) < 1 ? "" : `${Math.floor(friend?.time/3600)} hour${Math.floor(friend?.time/3600) < 2 ? "" : "s"} ` }{Math.floor(friend?.time/3600) < 1 ? `${(((friend?.time/3600)%1)*60).toFixed(0)} minute${Number(((friend?.time/3600)%1)*60).toFixed(0)<2 ? "" : "s"}`:`${(((friend?.time/3600)%1)*60).toFixed(0)} minutes`}
                      </div>
                      <div className='descriptionDiv'>
                        Duration
                      </div>
                    </div>
                  </div>
                  <div id='lastDiv'>

                    {!showMenu && (
                      <span id='commentsButton' onClick={() => {openMenu(friend?.id)}}>
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
                      <CommentsFeed id={friend.id}/>
                    <div className='commentForm'>
                      <div className='formPic'>
                        Picture
                      </div>
                      <div className='formField'>
                      <form onSubmit={(event)=> handleSubmit(event, friend.id)} className='commentInput'>
                            <textarea
                                rows='1'
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                name="body"
                                placeholder="Add a comment"
                            ></textarea>
                            <div className='formButtonDiv'>
                              <button className='formButton' type="submit">Submit</button>
                            </div>
                      </form>
                      </div>
                    </div>
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
  /******** If Friends is clicked, ABOVE will render **********/



  return (
    <>
        <div id='middle'>
        {sessionUser && (
          <div id='dropdown'>
                {/* <button onClick={seeFriends}>
                  Explore
                </button> */}
                <button onClick={openDrop}>
                  Explore
                </button>

                {drop && (
                  <button onClick={seeFriends}>
                  Friends
                  </button>
                )}
          </div>
        )}
            {Object.keys(runs)?.map(id => {
            let run = runs[id]
            // let runId = run.id
            // console.log('this is runiddddd',runId);
            return(
              <div key={run.id} className='cardDiv' id={run.id}>
                <div id='profilePicDiv'>
                  Picture
                </div>
                <div id='mainDetailsDiv'>
                  <div id='nameDiv'>
                    <p id='name'>
                      {run?.user_name.username} went for a run
                    </p>
                    {sessionUser && (
                    <div className='addFriend'>
                      {/* <button onClick={sendRequest}> */}
                      <button onClick={(event)=> sendRequest(event, run.runner_id)}>
                        Add Friend
                      </button>
                    </div>
                    )}
                  </div>
                  <div id='screenshot' style={{ backgroundImage: `url(${run?.image_url})`}}>
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
                      {(run.distance*102).toFixed(1)}
                      </div>
                      <div className='descriptionDiv'>
                        Calories Burned(kcal)
                      </div>
                    </div>
                    <div className='detailDiv'>
                      <div className='inDetailDiv'>
                      {Math.floor(run?.time/3600) < 1 ? "" : `${Math.floor(run?.time/3600)} hour${Math.floor(run?.time/3600) < 2 ? "" : "s"} ` }{Math.floor(run?.time/3600) < 1 ? `${(((run?.time/3600)%1)*60).toFixed(0)} minute${Number(((run?.time/3600)%1)*60).toFixed(0)<2 ? "" : "s"}`:`${(((run?.time/3600)%1)*60).toFixed(0)} minutes`}
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
                      <span id='commentsButton' onClick={() => {openMenu(run?.id)}}>
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
                      <CommentsFeed id={run.id}/>
                    {sessionUser && (
                    <div className='commentForm'>
                      <div className='formPic'>
                        Picture
                      </div>
                      <div className='formField'>
                      <form onSubmit={(event)=> handleSubmit(event, run.id)} className='commentInput'>
                            <textarea
                                rows='1'
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                name="body"
                                placeholder="Add a comment"
                            ></textarea>
                            <div className='formButtonDiv'>
                              <button className='formButton' type="submit">Submit</button>
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
