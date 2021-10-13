import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {getRunsThunk} from '../../store/runs'
import './ActivityFeed.css'
import CommentsFeed from '../Comments';
import {FaRegComments} from 'react-icons/fa'
import { getCommentsThunk, setComments } from '../../store/comments';
import EditCommentForm from '../EditCommentForm';


export default function ActivityFeed() {
  const sessionUser = useSelector(state => state.session.user);
  const runs = useSelector(store => store?.runs)
  const commentsObject = useSelector(state => state?.comments)

  const dispatch = useDispatch()

  const [showMenu, setShowMenu] = useState(false);
  const [body, setBody] = useState('');
  const [cardId, setCardId] = useState();
  const [commentTest, setCommentTest] = useState(false);


  console.log('this is commentsObject',commentsObject);

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

  useEffect(() => {
    dispatch(getRunsThunk())
    dispatch(getCommentsThunk())
  },[dispatch])


  if(!sessionUser){
    return (
        <div>sign in first</div>
    )
  }

  return (
    <>
        <div id='middle'>
          <div id='dropdown'>
                <button>Explore</button>
          </div>
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
                    <button className='delete'>
                      X
                    </button>
                  </div>
                  <div id='screenshot'>
                    screenshot
                  </div>
                  <div id='runDetailsDiv'>
                    <div className='detailDiv'>
                      <div className='inDetailDiv'>
                        {run.distance}
                        {run.id}
                      </div>
                      <div className='descriptionDiv'>
                        Distance(mi)
                      </div>
                    </div>
                    <div className='detailDiv middle'>
                      <div className='inDetailDiv'>
                        {run.time}
                      </div>
                      <div className='descriptionDiv'>
                        Avg Pace(min/mi)
                      </div>
                    </div>
                    <div className='detailDiv'>
                      <div className='inDetailDiv'>
                        {run.time}
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

                    <div id='createdDate'>
                      created
                    </div>
                  </div>
                  {/* If conditional here to show comments feed if CommentButton is clicked */}
                  {/* <div id='comments'>
                      {run?.comments?.map(comment => comment.body)}
                  </div> */}
                  {(showMenu && cardId === run.id) && (
                    <>
                    {run?.comments?.map(comment =>
                      <div key={comment.id}className='commentDiv'>
                        <div className='commentPicDiv'>
                          Picture
                        </div>
                        <div className='nameBodyDiv'>
                          <div className='commentNameDiv'>
                            {comment?.user_name?.username}
                          </div>
                          <div className='commentBodyDiv'>
                            {comment.body}
                          </div>
                        </div>
                        {sessionUser.id === comment?.user_name?.id ?
                          // setShowEditMenu(true) &&
                          <EditCommentForm comment={comment}/> : null
                        }
                        <div className='commentCreatedDiv'>
                          created
                        </div>
                      </div>
                    )}
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
