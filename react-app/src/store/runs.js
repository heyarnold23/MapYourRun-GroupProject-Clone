const GET_RUNS = 'runs/LOAD';

const getRuns = (runsObject) => {
    return {
        type: GET_RUNS,
        payload: runsObject
    }
}



export const getRunsThunk = () => async (dispatch) => {
    console.log('inside runsthuunkkkkkk');
    const response = await fetch('/api/runs')

    console.log('responnnnsseseee', response);
    let run_obj = await response.json()

    console.log('this is runs arrrrraayyy',run_obj)
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
