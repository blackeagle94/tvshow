import axios from 'axios'

const FETCH_Episodes_REQUEST = 'FETCH_Episodes_REQUEST'
const FETCH_Episodes_SUCCESS = 'FETCH_Episodes_SUCCESS'
const FETCH_Episodes_FAILURE = 'FETCH_Episodes_FAILURE'

const initialState = {
    loading: false,
    data: [],
    error: ''
}

const fetchEpisodesRequest = () => {
    return {
        type: FETCH_Episodes_REQUEST
    }
}

const fetchEpisodesSucces= (films) => {
    return {
        type: FETCH_Episodes_SUCCESS,
        payload: films
    }
}

const fetchEpisodesFailure= (error) => {
    return {
        type: FETCH_Episodes_FAILURE,
        payload: error
    }
}

const episodesFetchingReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_Episodes_REQUEST:
          return {
              ...state,
              loading: true
          }
        case FETCH_Episodes_SUCCESS:
            return {
                loading: false,
                data:  action.payload,
                error: ''
            }
        case FETCH_Episodes_FAILURE:
            return {
                loading: false,
                data: [],
                error: action.payload
            }
        default:
            return state
    }
}

export const fetchEpisodes = (url) => {
    return (dispatch) => {
        dispatch(fetchEpisodesRequest())
        axios.get(url)
        .then(response => {
            //response.data is array of Episodes
            const films = response.data
            dispatch(fetchEpisodesSucces(films))
        })
        .catch(error => {
            //error.message is the error description
            dispatch(fetchEpisodesFailure(error.message))
        })
    }
}

export default episodesFetchingReducer