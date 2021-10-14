import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { getRunsThunk } from '../../store/runs';
import './Dashboard.css'
import { addModal, toggleModalView} from '../../store/session';

export default function Dashboard() {
    const sessionUser = useSelector(state => state.session?.user);
    const dispatch = useDispatch()
    const runs = useSelector(store => store?.runs)
    let runArr;
    let distance = 0;
    let calories = 0;

    if(runs) {
        runArr = Object.values(runs)
        runArr = runArr.filter(run => run?.runner_id === sessionUser?.id)
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
            <h1 id="title">{sessionUser?.username?.split("")[0].toUpperCase() + sessionUser?.username?.slice(1)
}'s Dashboard</h1>
            <div className="stats">
                <h3>Distance Ran: {distance} miles</h3>
                <h3>Calories Burned: {calories}</h3>
                <h3>Age: {sessionUser?.age}</h3>
                <h3>Height: {sessionUser?.height}</h3>
                <h3>Weight: {sessionUser?.weight} lbs</h3>
            </div>
        </div>
        <hr id="line"></hr>
        <div id="table_div">
            <table id="runs_table">
                <thead>
                    <tr className="runs_table_rows">
                        <th className="table_head">Start Point</th>
                        <th className="table_head">End Point</th>
                        <th className="table_head">Distance</th>
                        <th className="table_head">Minutes to Complete</th>
                    </tr>
                </thead>
                <tbody>
                    {runArr.map(run => (
                        <tr key={run.id} className="runs_table_rows">
                            <td className="table_data">{run?.start_point}</td>
                            <td className="table_data">{run?.end_point}</td>
                            <td className="table_data">{run?.distance.toFixed(1)} miles</td>
                            <td className="table_data">{Math.floor(run?.time / 60)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    )

}
