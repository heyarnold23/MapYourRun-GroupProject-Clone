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

    let runArr = run_obj
    console.log('this is runs arrrrraayyy',runArr)
    if(response.ok){
        dispatch(getRuns(runArr))
    }
}






const initialState = {}
export default function runsReducer(state = initialState, action) {
    const newState = {...state}
    switch (action.type) {
        case GET_RUNS:
            // const newState = {};
            // action.payload.forEach(run => {newState[run.id] = run});
            // return newState;
            return action.payload
        default:
            return state
    }

}
