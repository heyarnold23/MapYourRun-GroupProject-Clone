import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {getRunsThunk} from '../../store/runs'
import './ActivityFeed.css'

export default function ActivityFeed() {
  const dispatch = useDispatch()
  const runs = useSelector(store => store?.runs)

  useEffect(() => {
    dispatch(getRunsThunk())
  },[dispatch])

  console.log('this is runnnnnsss',runs);
  console.log(runs['1']);
  return (
    <>
        <div id='middle'>
          <div id='dropdown'>
                <button>Explore</button>
          </div>
            {Object.keys(runs)?.map(id => {
            let run = runs[id]
            return(
              <>
              <div id='cardDiv'>
                <div id='profilePicDiv'>
                  Picture
                </div>
                <div id='mainDetailsDiv'>
                  <div id='nameDiv'>
                    <p id='name'>
                      name went for a run
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
                      commentsButton
                    </div>
                    <div id='createdDate'>
                      created
                    </div>
                  </div>




                </div>




              </div>
              </>
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
