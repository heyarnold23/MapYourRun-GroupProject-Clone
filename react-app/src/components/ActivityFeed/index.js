import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {getRunsThunk} from '../../store/runs'


export default function ActivityFeed() {
  const dispatch = useDispatch()
  const runs = useSelector(store => store?.runs)

  useEffect(() => {
    dispatch(getRunsThunk())
  },[dispatch])

  console.log('this is runnnnnsss',runs);
  return (
    <>
        <div>
            {Object.keys(runs)?.map(id => {
            let run = runs[id]
            return(

                <div key={run.id} className='single-run'>
                    <h1>{run.runner_id}</h1>
                    <h1>{run.id}</h1>
                </div>

            )
            })}
        </div>
        <h1>Hello</h1>
    </>

  )

}
