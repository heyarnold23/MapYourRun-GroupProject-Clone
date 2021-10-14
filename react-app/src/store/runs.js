
const GET_RUNS = 'runs/LOAD';


const getRuns = (runsObject) => {
    return {
        type: GET_RUNS,
        payload: runsObject
    }
}


export const deleteRun = (id) => async dispatch => {

    const response = await fetch(`/api/runs/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
    });

    const runs_response = await fetch(`/api/runs`, {
        headers: {
          'Content-Type': 'application/json',
        },
    });



    if(response.ok){
        const runs_data = await runs_response.json()
        dispatch(getRuns(runs_data))
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


export const editRun = (id,runner_id,start_point,end_point,distance,time) => async dispatch => {
    const body = JSON.stringify({id,start_point, end_point, distance, time, runner_id })


    const response = await fetch(`/api/runs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body
    });

    const runs_response = await fetch(`/api/runs`, {
        headers: {
          'Content-Type': 'application/json',
        },
    });


    if(response.ok){
        const runs_data = await runs_response.json()
        dispatch(getRuns(runs_data))
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


export const setRuns = (id,start_point,end_point,distance,time) => async dispatch => {
    const body = JSON.stringify({start_point, end_point, distance, time, runner_id:id })


    const response = await fetch('/api/runs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body
    });

    if(response.ok){
        // const data = await response.json();
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
    let newState = {...state}
    switch (action.type) {
        case GET_RUNS:
            newState = {...state, ...action.payload}
            // return action.payload
            return newState
        default:
            return state
    }

}
