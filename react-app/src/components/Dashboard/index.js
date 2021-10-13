import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { getRunsThunk } from '../../store/runs';
import './Dashboard.css'

export default function Dashboard() {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const runs = useSelector(store => store?.runs)
    let runArr;
    let distance = 0;
    // console.log(runArr)

    if(runs) {
        runArr = Object.values(runs)
        runArr = runArr.filter(run => run.runner_id === sessionUser.id)
         runArr.map(run => {
            distance += Math.floor(run.distance)
            console.log(distance)
        })
    }

    useEffect(() => {
        dispatch(getRunsThunk())
      },[dispatch])

    return (
        <>
        <div>

            
            {/* <div><h1 id="header">Dashboard</h1></div>
            {runArr.map(run => (
                <div key={run.id} className="runs">{Math.floor(run.distance)}</div>
            ))} */}
        </div>
        </>
    )

}