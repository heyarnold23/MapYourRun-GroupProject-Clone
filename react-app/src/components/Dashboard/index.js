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
    let calories = 0;
    console.log(sessionUser)

    if(runs) {
        runArr = Object.values(runs)
        runArr = runArr.filter(run => run.runner_id === sessionUser.id)
         runArr.map(run => {
            distance += Math.floor(run.distance)
        })
        calories = distance * 102;
    }

    useEffect(() => {
        dispatch(getRunsThunk())
      },[dispatch])

    return (
        <>
        <div>
            <h1 id="title">My Dashboard</h1>
            <div className="stats">
                <h3>Distance Ran: {distance} miles</h3>
                <h3>Calories Burnt: {calories}</h3>
                <h3>Age: {sessionUser.age}</h3>
                <h3>Height: {sessionUser.height}</h3>
                <h3>Weight: {sessionUser.weight} lbs</h3>
            </div>
        </div>
        <hr id="line"></hr>
        <div>
            <table>
                <thead>
                    <tr>
                        <th className="table_head">Start Point</th>
                        <th className="table_head">End Point</th>
                        <th className="table_head">Distance</th>
                        <th className="table_head">Time to Complete</th>
                    </tr>
                </thead>
            </table>
        </div>
        </>
    )

}