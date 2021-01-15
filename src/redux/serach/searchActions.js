import axios from 'axios'

const FETCH_SEARCH_REQUEST = 'FETCH_SEARCH_REQUEST'
const FETCH_SEARCH_SUCCESS = 'FETCH_SEARCH_SUCCESS'
const FETCH_SEARCH_FAILURE = 'FETCH_SEARCH_FAILURE'

const initialState = {
    loading: false,
    data: [],
    error: ''
}

const fetchSEARCHRequest = () => {
    return {
        type: FETCH_SEARCH_REQUEST
    }
}

const fetchSEARCHSucces= (films) => {
    return {
        type: FETCH_SEARCH_SUCCESS,
        payload: films
    }
}

const fetchSEARCHFailure= (error) => {
    return {
        type: FETCH_SEARCH_FAILURE,
        payload: error
    }
}

const SEARCHFetchingReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_SEARCH_REQUEST:
          return {
              ...state,
              loading: true
          }
        case FETCH_SEARCH_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                error: ''
            }
        case FETCH_SEARCH_FAILURE:
            return {
                loading: false,
                data: [],
                error: action.payload
            }
        default:
            return state
    }
}

export const fetchSEARCH = (url) => {
    return (dispatch) => {
        dispatch(fetchSEARCHRequest())
        axios.get(url)
        .then(response => {
            //response.data is array of SEARCH
            const films = response.data
            dispatch(fetchSEARCHSucces(films))
        })
        .catch(error => {
            //error.message is the error description
            dispatch(fetchSEARCHFailure(error.message))
        })
    }
}

export default SEARCHFetchingReducer