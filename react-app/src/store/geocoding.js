const SET_DATA = "geocoding/SET_DATA"


export const setData = (data) => {
    return {
        type:SET_DATA,
        payload:data
    }
}

export const getData = (url) => async dispatch => {
    console.log("URL HERE",url)
    const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.errors) {
          return;
        }

        dispatch(setData(data));
      }
}

const geocodingReducer = (state={},action) => {
    const newState = {}
    switch(action.type){
        case SET_DATA:{
            newState.data=action.payload
            return newState
        }
        default:
            return state
    }
}

export default geocodingReducer
