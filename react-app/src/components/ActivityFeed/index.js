import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {getRunsThunk} from '../../store/runs'
import './ActivityFeed.css'
import CommentsFeed from '../Comments';

export default function ActivityFeed() {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch()
  const runs = useSelector(store => store?.runs)



  useEffect(() => {
    dispatch(getRunsThunk())
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
              <div key={run.id} id='cardDiv'>
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
                    <div id='commentsButton'>
                      CommentButton
                    </div>
                    <div id='createdDate'>
                      created
                    </div>
                  </div>
                  {/* If conditional here to show comments feed if CommentButton is clicked */}
                  {/* <div id='comments'>
                      {run?.comments?.map(comment => comment.body)}
                  </div> */}
                  {run?.comments?.map(comment =>
                    <div className='commentDiv'>
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
                      <div className='commentCreatedDiv'>
                        created
                      </div>
                    </div>
                  )}

                </div>
              </div>
            )
            })}
        </div>

        {/* <div id='dropdown'>
          Explore
        </div>
        <div id='cardDiv'>
          <div id='profilePicDiv'>
            Placeholder
          </div>
          <div id='mainDetailsDiv'>
            <div id='nameDiv'>
              name
            </div>
            <div id='screenshot'>
              screenshot
            </div>
            <div id='runDetailsDiv'>
              <div id='distanceDiv'>

              </div>

            </div>





          </div>




        </div> */}



    </>

  )

}
