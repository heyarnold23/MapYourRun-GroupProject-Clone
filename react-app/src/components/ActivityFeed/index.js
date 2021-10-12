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
  console.log(runs['1']);
  return (
    <>
        <div>
            {Object.keys(runs)?.map(id => {
            let run = runs[id]
            return(

                <div key={run.id} className='single-run'>
                    <h1>this is runner id {run.runner_id}</h1>
                    <h1>this is run id {run.id}</h1>
                </div>

            )
            })}
        </div>
    </>

  )

}
