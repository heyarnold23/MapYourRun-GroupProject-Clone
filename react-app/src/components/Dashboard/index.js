import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { getRunsThunk } from '../../store/runs';
import { addModal, toggleModalView } from '../../store/session';
import { NavLink } from 'react-router-dom';
import './Dashboard.css'
// import { addModal, toggleModalView} from '../../store/session';
import { deleteRun } from '../../store/runs';
import { FaRegTrashAlt } from 'react-icons/fa'
import { TiEdit } from 'react-icons/ti'
import FormModal from "../Modal";

export default function Dashboard() {
    const sessionUser = useSelector(state => state.session?.user);
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false);
    const runs = useSelector(store => store?.runs)
    const modalView = useSelector(state => state.session.modalView)
    let runArr;
    let distance = 0;
    let calories = 0;

    const deleteClick = (runId) => {
        dispatch(deleteRun(runId))
        return
    }

    useEffect(()=>{
        dispatch(addModal("loading"))
        dispatch(toggleModalView(true))
    },[])

    if(runs) {
        runArr = Object.values(runs)
        runArr = runArr.filter(run => run?.runner_id === sessionUser?.id)
         runArr.map(run => {
            distance += run.distance
        })
        calories = (distance * 102).toFixed(0);
        distance = distance.toFixed(1)
    }

    if(runArr.length && !isLoaded)setIsLoaded(true)

    useEffect(()=>{
        if(isLoaded){
            dispatch(toggleModalView(false))
        }
    },[isLoaded])

    useEffect(() => {
        dispatch(getRunsThunk())
        return
      },[dispatch])

      if(modalView) return (<FormModal/>)
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
                        <th className="table_head">Route</th>
                        <th className="table_head">Distance</th>
                        <th className="table_head">Time</th>
                        <th className="table_head">Options</th>
                    </tr>
                </thead>
                <tbody>
                    {runArr.map(run => (
                        <tr key={run.id} className="runs_table_rows">
                            <td className="table_data"><img src = {run?.image_url} width="250px" height="100px"></img></td>
                            <td className="table_data">{run?.distance.toFixed(1)} miles</td>
                            <td className="table_data">
                                {Math.floor(run?.time/3600) < 1 ? "" : `${Math.floor(run?.time/3600)} hour${Math.floor(run?.time/3600) < 2 ? "" : "s"} ` }
                                {Math.floor(run?.time/3600) < 1 ? `${(((run?.time/3600)%1)*60).toFixed(0)} minute${Number(((run?.time/3600)%1)*60).toFixed(0)<2 ? "" : "s"}`:`${(((run?.time/3600)%1)*60).toFixed(0)} minutes`}
                            </td>
                            <td>
                                <div className="buttons_wrapper">
                                    <NavLink to = {{pathname:"/new-route",state:run}} className = "edit-run-link"><TiEdit /></NavLink>
                                    <button onClick = {()=>deleteClick(run.id)} className = "delete-run-button"><FaRegTrashAlt /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        </>
    )

}
