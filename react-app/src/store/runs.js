const SET_RUNS = "runs/SET_RUNS"



export const set_runs = (id) => async dispatch => {
    const response = await fetch('/api/runs', {
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


const runsReducer = (state={}, action) => {
    const newState = {}
    switch(action.type){
        default:{
            return state
        }
    }
}

export default runsReducer
