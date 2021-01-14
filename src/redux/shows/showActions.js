import axios from 'axios'

const FETCH_SHOWS_REQUEST = 'FETCH_SHOWS_REQUEST'
const FETCH_SHOWS_SUCCESS = 'FETCH_SHOWS_SUCCESS'
const FETCH_SHOWS_FAILURE = 'FETCH_SHOWS_FAILURE'

const initialState = {
    loading: false,
    data: [],
    error: ''
}

const fetchSHOWSRequest = () => {
    return {
        type: FETCH_SHOWS_REQUEST
    }
}

const fetchSHOWSSucces= (films) => {
    return {
        type: FETCH_SHOWS_SUCCESS,
        payload: films
    }
}

const fetchSHOWSFailure= (error) => {
    return {
        type: FETCH_SHOWS_FAILURE,
        payload: error
    }
}

const showsFetchingReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_SHOWS_REQUEST:
          return {
              ...state,
              loading: true
          }
        case FETCH_SHOWS_SUCCESS:
            return {
                loading: false,
                films: action.payload,
                error: ''
            }
        case FETCH_SHOWS_FAILURE:
            return {
                loading: false,
                films: [],
                error: action.payload
            }
        default:
            return state
    }
}

export const fetchSHOWS = (url) => {
    return (dispatch) => {
        dispatch(fetchSHOWSRequest())
        axios.get(url)
        .then(response => {
            //response.data is array of SHOWS
            const films = response.data
            dispatch(fetchSHOWSSucces(films))
        })
        .catch(error => {
            //error.message is the error description
            dispatch(fetchSHOWSFailure(error.message))
        })
    }
}

export default showsFetchingReducer