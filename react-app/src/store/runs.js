import { csrfFetch } from "./csrf";


const GET_RUNS = 'runs/LOAD';


const getRuns = (runsObject) => {
    return {
        type: GET_RUNS,
        payload: runsObject
    }
}

export const setRuns = (id,startPoint,endPoint,distance,time) => async dispatch => {
    const response = await csrfFetch('/api/runs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startPoint,
          endPoint,
          distance,
          time,
          runnerId:id
        }),
    });

    if(response.ok){
        const data = await response.json();
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
          return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
      }

}



export const getRunsThunk = () => async (dispatch) => {
    const response = await fetch('/api/runs')

    let run_obj = await response.json()

    if(response.ok){
        dispatch(getRuns(run_obj))
    }
}






const initialState = {}
export default function runsReducer(state = initialState, action) {
    const newState = {...state}
    switch (action.type) {
        case GET_RUNS:
            return action.payload
        default:
            return state
    }

}
