import axios from 'axios'

const FETCH_Seasons_REQUEST = 'FETCH_Seasons_REQUEST'
const FETCH_Seasons_SUCCESS = 'FETCH_Seasons_SUCCESS'
const FETCH_Seasons_FAILURE = 'FETCH_Seasons_FAILURE'

const initialState = {
    loading: false,
    data: [],
    error: ''
}

const fetchSeasonsRequest = () => {
    return {
        type: FETCH_Seasons_REQUEST
    }
}

const fetchSeasonsSucces= (films) => {
    return {
        type: FETCH_Seasons_SUCCESS,
        payload: films
    }
}

const fetchSeasonsFailure= (error) => {
    return {
        type: FETCH_Seasons_FAILURE,
        payload: error
    }
}

const seasonsFetchingReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_Seasons_REQUEST:
          return {
              ...state,
              loading: true
          }
        case FETCH_Seasons_SUCCESS:
            return {
                loading: false,
                data:  action.payload,
                error: ''
            }
        case FETCH_Seasons_FAILURE:
            return {
                loading: false,
                data: [],
                error: action.payload
            }
        default:
            return state
    }
}

export const fetchSeasons = (url) => {
    return (dispatch) => {
        dispatch(fetchSeasonsRequest())
        axios.get(url)
        .then(response => {
            //response.data is array of Seasons
            const films = response.data
            dispatch(fetchSeasonsSucces(films))
        })
        .catch(error => {
            //error.message is the error description
            dispatch(fetchSeasonsFailure(error.message))
        })
    }
}

export default seasonsFetchingReducer